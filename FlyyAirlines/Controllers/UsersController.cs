using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userData;
        public UsersController(IUserRepository userData)
        {
            _userData = userData;
        }
        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpGet]
        public IActionResult GetUsers()
        {
            try
            {
                var GetUsers = _userData.GetAll();
                return Ok(GetUsers);
            } catch(Exception)
            {
                return BadRequest();
            }
        }
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            try
            {
                var GetUser = _userData.Get(id);
                return Ok(GetUser);
            } catch(Exception)
            {
                return NotFound();
            }
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPut("{id}")]
        public IActionResult Put(string id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userData.Update(user);
            return NoContent();
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
             _userData.Delete(id);
            return NoContent();
        }
    }
}
