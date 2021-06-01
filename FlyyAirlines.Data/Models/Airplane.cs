using System;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace FlyyAirlines.Models
{
    public class Airplane
    {
        [Key]
        public Guid AirplaneId { get; set; }
        public string PlaneName { get; set; }
        public int? NumberOfSeats { get; set; }
    }
}
