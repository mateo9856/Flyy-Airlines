using AutoMapper;
using FlyyAirlines.DTO.AutoMapper;
using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using FlyyAirlines.Repository.Employees;
using FlyyAirlines.Repository.FlightsAirplanes;
using FlyyAirlines.Repository.Reservations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

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

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
            });

            services.AddControllers();
            services.AddDbContext<AppDBContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("FlyyAirlines"), b => b.MigrationsAssembly("FlyyAirlines")));
            
            services.AddScoped<IMainRepository<User>, MainRepository<User>>();
            services.AddScoped<IMainRepository<Reservation>, MainRepository<Reservation>>();
            services.AddScoped<IMainRepository<Flight>, MainRepository<Flight>>();
            services.AddScoped<IMainRepository<Airplane>, MainRepository<Airplane>>();
            services.AddScoped<IMainRepository<Employee>, MainRepository<Employee>>();
            services.AddScoped<IReserveData, ReserveData>();
            services.AddScoped<IAirplanesFlightsData, AirplanesFlightsData>();
            services.AddScoped<IEmployeeData, EmployeeData>();
            services.AddSingleton(mapper);
            
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        private void MainRepository<T>()
        {
            throw new NotImplementedException();
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
