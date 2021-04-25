using System;
using System.Collections.Generic;

#nullable disable

namespace FlyyAirlines.Models
{
    public class AirplanesFlight
    {
        public int FlightsId { get; set; }
        public int AirplaneId { get; set; }

        public virtual Airplane Airplane { get; set; }
        public virtual Flight Flights { get; set; }
    }
}
