using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.DTO
{
    public class FlightDTO
    {
        public int FlightsId { get; set; }
        public string FlightName { get; set; }
        public DateTime DepartureDate { get; set; }
    }
}
