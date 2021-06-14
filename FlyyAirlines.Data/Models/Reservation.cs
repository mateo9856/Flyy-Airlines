using FlyyAirlines.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace FlyyAirlines.Models
{
    public class Reservation : BaseEntity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public int PersonIdentify { get; set; }
        public int Seat { get; set; }

        public virtual Flight Flights { get; set; }
        public virtual User User { get; set; }
    }
}
