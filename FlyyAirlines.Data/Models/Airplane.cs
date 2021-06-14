using FlyyAirlines.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace FlyyAirlines.Models
{
    public class Airplane : BaseEntity
    {
        public string PlaneName { get; set; }
        public int? NumberOfSeats { get; set; }
        public List<Flight> Flights { get; set; }
    }
}
