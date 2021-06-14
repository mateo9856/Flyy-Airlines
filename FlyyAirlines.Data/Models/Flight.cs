using FlyyAirlines.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace FlyyAirlines.Models
{
    public class Flight : BaseEntity
    {
        public Flight()
        {
            Reservations = new HashSet<Reservation>();
        }
        public string FlightName { get; set; }
        public string FromCountry { get; set; }
        public string FromCity { get; set; }
        public string ToCountry { get; set; }
        public string ToCity { get; set; }
        public DateTime DepartureDate { get; set; }
        public Guid AirplaneId { get; set; }
        public virtual Airplane Airplane { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
