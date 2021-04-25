using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace FlyyAirlines.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string WorkPosition { get; set; }
        public bool IsAdmin { get; set; }

        public virtual User User { get; set; }
    }
}
