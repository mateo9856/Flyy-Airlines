using System;

namespace FlyyAirlines.DTO
{
    public class FlightDTO
    {
        public string FlightName { get; set; }
        public string FromCountry { get; set; }
        public string ToCountry { get; set; }
        public string FromCity { get; set; }
        public string ToCity { get; set; }
        public string Airplane { get; set; }
        public string[] DepartureDate { get; set; }
    }
}
