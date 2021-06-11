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
            var GetAll = _mainEmployee.GetAll();
            return Ok(GetAll);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployee(Guid id)
        {
            var GetEmployee = await _mainEmployee.Get(id);
            return Ok(GetEmployee);
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
                EmployeeId = Guid.NewGuid(),
                Name = employee.Name,
                Surname = employee.Surname,
                WorkPosition = employee.WorkPosition,
            };
            await _mainEmployee.Add(newEmployee);
            return CreatedAtAction("Get", new { id = newEmployee.EmployeeId }, employee);
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }

            _mainEmployee.Update(employee);
            return NoContent();
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var Emp = await _mainEmployee.Get(id);
            await _mainEmployee.Delete(Emp);
            return NoContent();
        }
    }
}
