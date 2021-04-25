using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.Employees
{
    public class EmployeeData : IEmployeeData
    {
        private readonly AppDBContext _dbContext;
        public EmployeeData(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddEmployee(Employee employee)
        {
            if (employee == null)
            {
                return;
            }
            await _dbContext.Employees.AddAsync(employee);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> CheckReservation(Reservation reservation, User user)
        {
            var getUser = await _dbContext.Users.FindAsync(user);
            var checkReservation = getUser.Reservations.FirstOrDefault(res => res == reservation);
            if(checkReservation != null)
            {
                return true;
            }
            return false;
        }

        public async Task<Employee> GetEmployee(int employee)
        {
            return await _dbContext.Employees.FindAsync(employee);
        }

        public IEnumerable<Employee> GetEmployees()
        {
            return _dbContext.Employees.ToList();
        }

        public async Task RemoveEmployee(Employee employee)
        {
            _dbContext.Employees.Remove(employee);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateData(Employee employee)
        {
            var getEmployee = await _dbContext.Employees.FindAsync(employee.EmployeeId);
            if (getEmployee != null)
            {
                getEmployee = employee;
            }
        }
    }
}
