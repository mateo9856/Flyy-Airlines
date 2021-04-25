using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace FlyyAirlines.Models
{
    public class Airplane
    {
        [Key]
        public int AirplaneId { get; set; }
        public string PlaneName { get; set; }
        public DateTime DepartureDate { get; set; }
        public int? NumberOfSeats { get; set; }
    }
}
