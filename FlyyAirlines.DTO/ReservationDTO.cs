using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.DTO
{
    public class ReservationDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public int PersonIdentify { get; set; }
        public Flight Flight { get; set; }
        public string User { get; set; }
        public int Seat { get; set; }
    }
}
