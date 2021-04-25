using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.FlightsAirplanes
{
    public interface IAirplanesFlightsData
    {
        Task<Airplane> GetAirplane(int id);
        IEnumerable<AirplanesFlight> GetAll();
        Task<Flight> GetFlight(int id);
        Task AddFlight(Flight flight);
        Task<Flight> EditFlight(Flight flight);
        Task RemoveFlight(Flight flight);
        Task<bool> CheckReservesFromFlights(Reservation reservation, Flight flight);
    }
}
