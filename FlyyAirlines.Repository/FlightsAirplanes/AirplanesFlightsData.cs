using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
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
