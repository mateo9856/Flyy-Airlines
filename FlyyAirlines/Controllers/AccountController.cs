using FlyyAirlines.Data.Models;
using FlyyAirlines.DTO;
using FlyyAirlines.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        private readonly SignInManager<User> _signInManager;

        private readonly AppDBContext _dbContext;

        private readonly IConfiguration _configuration;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, AppDBContext dbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _dbContext = dbContext;
        }
        [Route("GetUser")]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var claim = claimsIdentity.Claims.Where(c => c.Type.Contains("email")).Select(x => x.Value).FirstOrDefault();

            var GetUser = await _userManager.FindByEmailAsync(claim);
            if(GetUser == null)
            {
                return Unauthorized();
            }
            return Ok(GetUser);
        }
        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegisterDTO userRegisterDto)
        {
            var userExists = await _userManager.FindByEmailAsync(userRegisterDto.Email);
            if(userExists != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDTO { StatusCode = "Error", Message = "User already exists!" });
            }

            var newUser = new User()
            {
                Id = Guid.NewGuid().ToString(),
                Email = userRegisterDto.Email,
                UserName = userRegisterDto.UserName,
                Password = userRegisterDto.Password,
                Name = userRegisterDto.Name,
                Surname = userRegisterDto.Surname,
                Role = Roles.User
            };

            var result = await _userManager.CreateAsync(newUser, userRegisterDto.Password);
            
            if(result.Succeeded)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                await _userManager.ConfirmEmailAsync(newUser, token);

                await _userManager.AddToRoleAsync(newUser, Roles.User);

                return Ok(new ResponseDTO{StatusCode = "Success", Message = "User Registration Succesful" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDTO { StatusCode = "Error", Message = "User creation failed! Please check user details and try again." });
            }
        }
        //[Authorize(Roles = "Admin, SuperAdmin")]
        [Route("addEmployee")]
        [HttpPost]
        public async Task<IActionResult> RegisterEmployee([FromBody] EmployeeAddDTO employee)
        {
            var userExists = await _userManager.FindByEmailAsync(employee.Email);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDTO { StatusCode = "Error", Message = "User already exists!" });
            }
            string newId = Guid.NewGuid().ToString();
            var newUser = new User()
            {
                Id = newId,
                Email = employee.Email,
                UserName = employee.UserName,
                Name = employee.Name,
                Surname = employee.Surname,
                Password = employee.Password,
                Role = Roles.Employee
            };

            var result = await _userManager.CreateAsync(newUser, employee.Password);
            if (result.Succeeded)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                await _userManager.ConfirmEmailAsync(newUser, token);

                await _userManager.AddToRoleAsync(newUser, Roles.Employee);
                
                var newEmployee = new Employee()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = employee.Name,
                    Surname = employee.Surname,
                    WorkPosition = employee.WorkPosition,
                    User = newUser,
                };

                await _dbContext.Employees.AddAsync(newEmployee);

                await _dbContext.SaveChangesAsync();

                return Ok(new ResponseDTO { StatusCode = "Success", Message = "Employee Registration Succesful" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDTO { StatusCode = "Error", Message = "User creation failed! Please check user details and try again." });
            }
        }
        [Authorize(Roles = Roles.SuperAdmin)]
        [Route("registerAdmin")]
        [HttpPost]
        public async Task<IActionResult> RegisterAdmin([FromBody] UserRegisterDTO userRegisterDto)
        {
            var userExists = await _userManager.FindByEmailAsync(userRegisterDto.Email);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDTO { StatusCode = "Error", Message = "User already exists!" });
            }

            var newUser = new User()
            {
                Id = Guid.NewGuid().ToString(),
                Email = userRegisterDto.Email,
                UserName = userRegisterDto.UserName,
                Password = userRegisterDto.Password,
                Role = Roles.Admin
                
            };

            var result = await _userManager.CreateAsync(newUser, userRegisterDto.Password);
            if (result.Succeeded)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                await _userManager.ConfirmEmailAsync(newUser, token);

                await _userManager.AddToRoleAsync(newUser, Roles.Admin);

                return Ok(new ResponseDTO { StatusCode = "Success", Message = "Employee Registration Succesful" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDTO { StatusCode = "Error", Message = "User creation failed! Please check user details and try again." });
            }
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                
                var authClaims = new[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
                string role = "";
                foreach(var userRole in userRoles)
                {
                     role = userRole;
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    id = user.Id,
                    user = user.UserName,
                    userRole = role,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }


        [Route("UpdateUser/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUser(string id, User user)
        {
            var GetUser = await _userManager.FindByIdAsync(id);
            if(GetUser == null)
            {
                return NotFound();
            } else
            {
                GetUser.UserName = user.UserName;
                GetUser.Password = user.Password;
                GetUser.Email = user.Email;
                GetUser.Name = user.Name;
                GetUser.Surname = user.Surname;
                var result = await _userManager.UpdateAsync(GetUser);
                if(result.Succeeded)
                {
                    return NoContent();
                }
                else
                {
                    return BadRequest();
                }
            }
        }

        [Route("UpdateEmployee/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(string id, EmployeeAddDTO employee)
        {
            var GetEmployee = await _dbContext.Employees.Include(r => r.User).FirstOrDefaultAsync(d => d.Id == id);
            var GetEmployeeUser = await _userManager.FindByIdAsync(GetEmployee.User.Id);
            if (GetEmployee == null)
            {
                return NotFound();
            }
            else
            {
                GetEmployeeUser.UserName = employee.UserName;
                GetEmployeeUser.Password = employee.Password;
                GetEmployeeUser.Email = employee.Email;
                GetEmployee.Name = employee.Name;
                GetEmployee.Surname = employee.Surname;
                GetEmployee.WorkPosition = employee.WorkPosition;

                _dbContext.Update(GetEmployee);
                var result = await _userManager.UpdateAsync(GetEmployeeUser);
                if (result.Succeeded)
                {
                    return NoContent();
                }
                else
                {
                    return BadRequest();
                }
            }
        }

        [Route("DeleteUser/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var GetUser = await _userManager.FindByIdAsync(id);

            if(GetUser != null)
            {
                var result = await _userManager.DeleteAsync(GetUser);

                if (result.Succeeded)
                    return Ok("User Deleted");

            } else
            {
                return BadRequest();
            }

            return NoContent();
        }

    }
}
