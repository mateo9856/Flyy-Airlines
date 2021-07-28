using FlyyAirlines.DTO;
using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using FlyyAirlines.Repository.Employees;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeData _employeeData;
        private readonly IMainRepository<Employee> _mainEmployee;
        public EmployeesController(IEmployeeData employeeData, IMainRepository<Employee> mainEmployee)
        {
            _employeeData = employeeData;
            _mainEmployee = mainEmployee;
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpGet]
        public IActionResult GetEmployees()
        {
            var child = new string[] { "User" };
            var GetAll = _mainEmployee.GetAll(child);
            return Ok(GetAll);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployee(string id)
        {
            var child = new string[] {"User"};
            var employeeDetails = await _mainEmployee.EntityWithEagerLoad(d => d.Id == id, child);
            return Ok(employeeDetails);
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeeAddDTO employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }
            var newEmployee = new Employee()
            {
                Id = Guid.NewGuid().ToString(),
                Name = employee.Name,
                Surname = employee.Surname,
                WorkPosition = employee.WorkPosition,
            };
            await _mainEmployee.Add(newEmployee);
            return CreatedAtAction("Get", new { id = newEmployee.Id }, employee);
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }
            var GetEmployee = await _mainEmployee.Get(id);
            GetEmployee.Surname = employee.Surname;
            GetEmployee.Name = employee.Name;
            GetEmployee.WorkPosition = employee.WorkPosition;
            _mainEmployee.Update(GetEmployee);
            return NoContent();
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var Emp = await _mainEmployee.Get(id);
            await _mainEmployee.Delete(Emp);
            return NoContent();
        }
    }
}
