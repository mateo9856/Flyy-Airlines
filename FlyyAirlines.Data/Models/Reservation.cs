using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace FlyyAirlines.Models
{
    public class Reservation
    {
        [Key]
        public Guid ReservationId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int PersonIdentify { get; set; }
        public int Seat { get; set; }

        public virtual Flight Flights { get; set; }
        public virtual User User { get; set; }
    }
}
