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
        Task<List<Flight>> FindFlightByPhrase(string phrase);
        Task<bool> CheckReservesFromFlights(Reservation reservation, Flight flight);
        string CalculateFlightTime(string[] datas);
        Flight RandomFlight();
    }
}
