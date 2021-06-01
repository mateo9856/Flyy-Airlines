using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMainRepository<User> _userData;
        public UsersController(IMainRepository<User> userData)
        {
            _userData = userData;
        }
        [Authorize(Roles = "Admin")]
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
        [Authorize]
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
        
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var getUser = await _userData.Get(id);
            if(getUser == null)
            {
                return NotFound();
            }
            await _userData.Delete(getUser);
            return NoContent();
        }
    }
}
