using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FlyyAirlines.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            Reservations = new HashSet<Reservation>();
        }
        [Key]
        public override string Id { get; set; }
        public override string UserName { get; set; }
        public string Password { get; set; }
        public override string Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool IsEmployee { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
