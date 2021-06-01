﻿using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using FlyyAirlines.Repository.Employees;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
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

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Employee employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }
            await _mainEmployee.Add(employee);
            return CreatedAtAction("Get", new { id = employee.EmployeeId }, employee);
        }

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

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var Emp = await _mainEmployee.Get(id);
            await _mainEmployee.Delete(Emp);
            return NoContent();
        }
    }
}