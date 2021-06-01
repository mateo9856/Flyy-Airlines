using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace FlyyAirlines.Models
{
    public class Flight
    {
        public Flight()
        {
            Reservations = new HashSet<Reservation>();
        }
        [Key]
        public Guid FlightsId { get; set; }
        public string FlightName { get; set; }
        public string[] From { get; set; }
        public string[] To { get; set; }
        public DateTime DepartureDate { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
