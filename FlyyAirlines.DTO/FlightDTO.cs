using System;

namespace FlyyAirlines.DTO
{
    public class FlightDTO
    {
        public string FlightName { get; set; }
        public string[] From { get; set; }
        public string[] To { get; set; }
        public DateTime DepartureDate { get; set; }
    }
}
