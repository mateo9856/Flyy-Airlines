using FlyyAirlines.Models;
using FlyyAirlines.Repository.Employees;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeData _employeeData;
        public EmployeesController(IEmployeeData employeeData)
        {
            _employeeData = employeeData;
        }

        [HttpGet]
        public ActionResult GetEmployees()
        {
            return Ok(_employeeData.GetEmployees());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployee(int id)
        {
            var GetEmployee = await _employeeData.GetEmployee(id);
            return Ok(GetEmployee);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Employee employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }
            await _employeeData.AddEmployee(employee);
            return CreatedAtAction("Get", new { id = employee.EmployeeId }, employee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }

            await _employeeData.UpdateData(employee);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var Emp = await _employeeData.GetEmployee(id);
            await _employeeData.RemoveEmployee(Emp);
            return NoContent();
        }
    }
}
