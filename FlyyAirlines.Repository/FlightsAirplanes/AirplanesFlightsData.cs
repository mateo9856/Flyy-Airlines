using FlyyAirlines.Models;
using LumenWorks.Framework.IO.Csv;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.FlightsAirplanes
{
    public class AirplanesFlightsData : IAirplanesFlightsData
    {
        private readonly AppDBContext _dbContext;
        public AirplanesFlightsData(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string CalculateFlightTime(string fromCity, string fromCountry, string toCountry, string toCtiy)
        {
            var csvTable = new DataTable();

            using (var csvReader = new CsvReader(new StreamReader(File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "FlightsCitiesData.csv"))), true))
            {
                csvTable.Load(csvReader);
            }

            List<DataRow> searchDatas = new List<DataRow>();

            for(int i = 0; i < csvTable.Rows.Count;i++)
            {
                if(csvTable.Rows[i][1].ToString() == fromCity && csvTable.Rows[i][4].ToString() == fromCountry || csvTable.Rows[i][1].ToString() == toCtiy && csvTable.Rows[i][4].ToString() == toCountry)
                {
                    searchDatas.Add(csvTable.Rows[i]);
                }
                
            }
            decimal[] fromLatLng = { decimal.Parse(searchDatas[0].ItemArray[2].ToString()), decimal.Parse(searchDatas[0].ItemArray[2].ToString()) };
            decimal[] toLatLng = { decimal.Parse(searchDatas[1].ItemArray[2].ToString()), decimal.Parse(searchDatas[0].ItemArray[1].ToString()) };
            //think pattern to calculate time
            decimal calc = (fromLatLng[0] / toLatLng[0]) - (toLatLng[1] / fromLatLng[0]);
            NumberFormatInfo precision = new NumberFormatInfo();
            precision.NumberDecimalDigits = 2;
            return calc.ToString("N", precision);

        }

            public async Task<bool> CheckReservesFromFlights(Reservation reservation, Flight flight)
        {
            var getFlight = await _dbContext.Flights.FindAsync(flight);
            var checkReservation = getFlight.Reservations.FirstOrDefault(res => res == reservation);
            if (checkReservation != null)
            {
                return true;
            }
            return false;
        }
    }
}
