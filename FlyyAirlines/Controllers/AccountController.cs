using FlyyAirlines.Data.Models;
using FlyyAirlines.DTO;
using FlyyAirlines.Models;
using FlyyAirlines.Repository.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
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
        private readonly IAccountRepository _accountRepository;
        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        [Route("GetUser")]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;

            var GetUser = await _accountRepository.GetCurrentUser(claimsIdentity);

            if(GetUser == null)
            {
                return Unauthorized();
            }
            return Ok(GetUser);
        }

        [Route("GetUserRole")]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUserRole()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var GetUser = await _accountRepository.GetUserRole(claimsIdentity);

            if (GetUser == null)
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
            var Login = await _accountRepository.Login(model);

            return Login != null ? Ok(Login) : Unauthorized(); 
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
