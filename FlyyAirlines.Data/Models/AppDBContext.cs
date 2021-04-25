using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace FlyyAirlines.Models
{
    public partial class AppDBContext : IdentityDbContext<User>
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options)
        {
        }

        public DbSet<Airplane> Airplanes { get; set; }
        public DbSet<AirplanesFlight> AirplanesFlights { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public override DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AirplanesFlight>().HasNoKey();
            base.OnModelCreating(modelBuilder);
        }
    }
}
