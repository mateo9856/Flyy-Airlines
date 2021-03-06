using FlyyAirlines.Models;
using LumenWorks.Framework.IO.Csv;
using Microsoft.EntityFrameworkCore;
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

        public string CalculateFlightTime(string[] datas)
        {

            string fromCity = datas[0];
            string fromCountry = datas[1];
            string toCity = datas[2];
            string toCountry = datas[3];


            var csvTable = new DataTable();

            using (var csvReader = new CsvReader(new StreamReader(File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "csv","FlightsCitiesData.csv"))), true))
            {
                csvTable.Load(csvReader);
            }

            List<DataRow> searchDatas = new List<DataRow>();

            for(int i = 0; i < csvTable.Rows.Count;i++)
            {
                if(csvTable.Rows[i][1].ToString() == fromCity && csvTable.Rows[i][4].ToString() == fromCountry || csvTable.Rows[i][1].ToString() == toCity && csvTable.Rows[i][4].ToString() == toCountry)
                {
                    searchDatas.Add(csvTable.Rows[i]);
                }
                
            }
            decimal fromLat = Convert.ToDecimal((string)searchDatas[0].ItemArray[2], CultureInfo.InvariantCulture);
            decimal fromLng = Convert.ToDecimal((string)searchDatas[0].ItemArray[3], CultureInfo.InvariantCulture);
            decimal toLat = Convert.ToDecimal((string)searchDatas[1].ItemArray[2], CultureInfo.InvariantCulture);
            decimal toLng = Convert.ToDecimal((string)searchDatas[1].ItemArray[3], CultureInfo.InvariantCulture);

            var Converter = Convert.ToDecimal(fromLat, CultureInfo.InvariantCulture);

            decimal[] fromLatLng = { fromLat, fromLng };
            decimal[] toLatLng = { toLat, toLng };
            decimal calc = (fromLatLng[0] / toLatLng[0]) + (toLatLng[1] / fromLatLng[0]);
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

        public async Task<List<Flight>> FindFlightByPhrase(string phrase)
        {
            var FindFlight = await _dbContext.Flights.Where(c => (c.FromCity == phrase || c.ToCity == phrase)).ToListAsync();
            return FindFlight;
        }

        public Flight RandomFlight()
        {
            var rnd = new Random().Next(0, _dbContext.Flights.Count() - 1);
            var Flight = _dbContext.Flights.ElementAt(rnd);
            return Flight;

        }
    }
}
