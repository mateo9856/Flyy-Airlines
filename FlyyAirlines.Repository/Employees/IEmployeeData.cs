using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.Employees
{
    public interface IEmployeeData
    {
        Task<bool> CheckReservation(Reservation reservation, User user);

    }
}
