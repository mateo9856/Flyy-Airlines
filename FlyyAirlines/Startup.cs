using AutoMapper;
using FlyyAirlines.DTO.AutoMapper;
using FlyyAirlines.Models;
using FlyyAirlines.Repository.Employees;
using FlyyAirlines.Repository.FlightsAirplanes;
using FlyyAirlines.Repository.Reservations;
using FlyyAirlines.Repository.Users;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace FlyyAirlines
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var mapConfig = new MapperConfiguration(config => config.AddProfile(new Mappers()));
            IMapper mapper = mapConfig.CreateMapper();

            services.AddIdentity<User, IdentityRole>(config =>
            {
                config.SignIn.RequireConfirmedEmail = true;
            }).AddEntityFrameworkStores<AppDBContext>()
            .AddDefaultTokenProviders();

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                {
                    options.SlidingExpiration = true;
                    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
                });

            services.AddControllers();
            services.AddDbContext<AppDBContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("FlyyAirlines"), b => b.MigrationsAssembly("FlyyAirlines")));
            
            services.AddScoped<IUserData, UserData>();
            services.AddScoped<IReserveData, ReserveData>();
            services.AddScoped<IAirplanesFlightsData, AirplanesFlightsData>();
            services.AddScoped<IEmployeeData, EmployeeData>();
            services.AddSingleton(mapper);
            
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
   

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            serviceProvider.GetRequiredService<AppDBContext>().Database.EnsureCreated();
        }
    }
}
