using FlyyAirlines.Data.Models;
using FlyyAirlines.DTO;
using FlyyAirlines.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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
                IsEmployee = false
            };

            var result = await _userManager.CreateAsync(newUser, userRegisterDto.Password);
            //przerobic baze zeby user nie mial relacji z employees
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
        public async Task<IActionResult> RegisterEmployee([FromBody] UserRegisterDTO userRegisterDto)
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
                IsEmployee = true
            };

            var result = await _userManager.CreateAsync(newUser, userRegisterDto.Password);
            if (result.Succeeded)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                await _userManager.ConfirmEmailAsync(newUser, token);

                await _userManager.AddToRoleAsync(newUser, Roles.Employee);

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
                IsEmployee = true
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
        public async Task<IActionResult> Login([FromBody] UserLoginDTO userLoginDto)
        {//mechanika działa trzeba ja zmodelować na lepsza i pamietac o przerobieniu bazy
            var foundUser = await _userManager.FindByEmailAsync(userLoginDto.Email);
            if(foundUser == null)
            {
                return new BadRequestObjectResult(new { Message = "Login failed" });
            }
            var result = await _signInManager.PasswordSignInAsync(foundUser, userLoginDto.Password, true, false);
            if(result.Succeeded)
            {
                Claim[] claims = new Claim[]
                {
                    new Claim(ClaimTypes.Email, foundUser.Email),
                    new Claim(ClaimTypes.Name, foundUser.UserName)
                };
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                return Ok(new ResponseDTO {StatusCode="Success", Message = "Log in succesful" });
            }
            else
            {
                return new BadRequestObjectResult(new { Message = "Login failed" });
            }
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            if(HttpContext.Request.Cookies.Count > 0)
            {
                var siteCookies = HttpContext.Request.Cookies.Where(c => c.Key.Contains(".AspNetCore.") || c.Key.Contains("Microsoft.Authentication"));
                foreach (var cookie in siteCookies)
                {
                    Response.Cookies.Delete(cookie.Key);
                }
            }

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new ResponseDTO { StatusCode = "Success", Message = "Log out succesful" });
        }
    }
}
