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
        Task<Employee> GetEmployee(int employee);
        IEnumerable<Employee> GetEmployees();
        Task AddEmployee(Employee employee);
        Task UpdateData(Employee employee);
        Task<bool> CheckReservation(Reservation reservation, User user);
        Task RemoveEmployee(Employee employee);
    }
}
