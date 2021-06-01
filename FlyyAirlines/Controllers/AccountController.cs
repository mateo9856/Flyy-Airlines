using FlyyAirlines.Data.Models;
using FlyyAirlines.DTO;
using FlyyAirlines.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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

        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            var GetUser = await _userManager.GetUserAsync(User);
            if(GetUser == null)
            {
                return Unauthorized();
            }
            return Ok(GetUser);
        }
        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegisterDTO userRegisterDto)//dopracować rejestracje 
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

        [Route("addEmployee")]
        [HttpPost]
        public async Task<IActionResult> RegisterEmployee([FromBody] EmployeeAddDTO userRegisterDto)
        {
            var userExists = await _userManager.FindByEmailAsync(userRegisterDto.Email);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDTO { StatusCode = "Error", Message = "User already exists!" });
            }
            string newId = Guid.NewGuid().ToString();
            var newUser = new User()
            {
                Id = newId,
                Email = userRegisterDto.Email,
                UserName = userRegisterDto.UserName,
                Password = userRegisterDto.Password,
                Role = Roles.Employee
            };
            var newEmployee = new Employee()
            {
                User = newUser,
                Name = userRegisterDto.Name,
                Surname = userRegisterDto.Surname,
                WorkPosition = userRegisterDto.WorkPosition,
                EmployeeId = Guid.NewGuid()
                
            };

            var result = await _userManager.CreateAsync(newUser, userRegisterDto.Password);
            if (result.Succeeded)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                await _userManager.ConfirmEmailAsync(newUser, token);

                await _userManager.AddToRoleAsync(newUser, Roles.Employee);

                await _dbContext.AddAsync(newEmployee);

                await _dbContext.SaveChangesAsync();

                return Ok(new ResponseDTO { StatusCode = "Success", Message = "Employee Registration Succesful" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDTO { StatusCode = "Error", Message = "User creation failed! Please check user details and try again." });
            }
        }

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

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
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
                    userRole = userRoles[0],
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

    }
}
