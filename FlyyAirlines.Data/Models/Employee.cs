using FlyyAirlines.Data.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlyyAirlines.Models
{
    public class Employee : BaseEntity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string WorkPosition { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
