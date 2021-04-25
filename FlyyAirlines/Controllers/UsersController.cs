using FlyyAirlines.Models;
using FlyyAirlines.Repository.Users;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserData _userData;
        public UsersController(IUserData userData)
        {
            _userData = userData;
        }
        
        [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            try
            {
                var GetUsers = await _userData.GetUsers();
                return Ok(GetUsers);
            } catch(Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var GetUser = _userData.GetUser(id);
                return Ok(GetUser);
            } catch(Exception)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<User>> Post([FromBody] User user)
        {
            var AddUser = await _userData.RegisterUser(user);
            if(AddUser == true)
            {
                return CreatedAtAction("Get", new { id = user.Id }, user);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var getUser = _userData.GetUser(id);
            if(getUser == null)
            {
                return NotFound();
            }
            await _userData.RemoveUser(getUser);
            return NoContent();
        }
    }
}
