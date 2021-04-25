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
        public async Task AddFlight(Flight flight)
        {
            await _dbContext.Flights.AddAsync(flight);
            await _dbContext.SaveChangesAsync();
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

        public async Task<Flight> EditFlight(Flight flight)
        {
            var getFlight = await _dbContext.Flights.FindAsync(flight.FlightsId);
            if(getFlight == null)
            {
                return null;
            }
            getFlight = flight;
            return getFlight;
        }

        public async Task<Airplane> GetAirplane(int id)
        {
            return await _dbContext.Airplanes.FindAsync(id);
        }

        public IEnumerable<AirplanesFlight> GetAll()
        {
            var GetAll = _dbContext.AirplanesFlights.ToList();
            return GetAll;
        }

        public async Task<Flight> GetFlight(int id)
        {
            return await _dbContext.Flights.FindAsync(id);
        }

        public async Task RemoveFlight(Flight flight)
        {
            _dbContext.Flights.Remove(flight);
            await _dbContext.SaveChangesAsync();
        }
    }
}
