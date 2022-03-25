using FlyyAirlines.DTO;
using FlyyAirlines.Models;
using Microsoft.AspNetCore.Identity;
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

namespace FlyyAirlines.Repository.Account
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<User> _userManager;

        private readonly SignInManager<User> _signInManager;

        private readonly AppDBContext _dbContext;

        private readonly IConfiguration _configuration;

        public AccountRepository(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, AppDBContext dbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _dbContext = dbContext;
        }

        public async Task<User> GetCurrentUser(ClaimsIdentity identity)
        {
            var claim = identity.Claims.Where(c => c.Type.Contains("email")).Select(x => x.Value).FirstOrDefault();

            return await _userManager.FindByEmailAsync(claim);
        }

        public Task<string[]> GetPermissions(ClaimsIdentity user)
        {
            throw new NotImplementedException();
        }

        public async Task<string> GetUserRole(ClaimsIdentity user)
        {
            var claim = user.Claims.Where(c => c.Type.Contains("email")).Select(x => x.Value).FirstOrDefault();

            var GetUser = await _userManager.FindByEmailAsync(claim);

            if(GetUser.Role == "Employee")
            {
                var GetActualUser = await _dbContext.Employees.FirstOrDefaultAsync(d => d.User == GetUser);
                return GetActualUser.WorkPosition;
            }
            return GetUser.Role;
        }

        public async Task<object> Login(UserLoginDTO user)
        {
            var GetUser = await _userManager.FindByEmailAsync(user.Email);
            if (GetUser != null && await _userManager.CheckPasswordAsync(GetUser, user.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(GetUser);

                var authClaims = new[]
                {
                    new Claim(ClaimTypes.Name, GetUser.UserName),
                    new Claim(ClaimTypes.Email, GetUser.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
                string role = "";
                foreach (var userRole in userRoles)
                {
                    role = userRole;
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddYears(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return new
                {
                    id = GetUser.Id,
                    user = GetUser.UserName,
                    userRole = role,
                    permissions = role,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                };
            }
            return null;
        }

        public Task<bool> RegisterUser(User user, string userType)
        {
            throw new NotImplementedException();
        }
    }
}
