using FlyyAirlines.Data.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace FlyyAirlines.Models
{
    public class Employee : BaseEntity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string WorkPosition { get; set; }
        public virtual User User { get; set; }
    }
}
