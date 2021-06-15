﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace FlyyAirlines.Models
{
    public partial class AppDBContext : IdentityDbContext<User>
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options)
        {
        }

        public DbSet<Airplane> Airplanes { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public override DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Airplane>().Property(b => b.Id)
                .HasColumnName("AirplaneId");
            modelBuilder.Entity<Employee>().Property(b => b.Id)
            .HasColumnName("EmployeeId");
            modelBuilder.Entity<Flight>().Property(b => b.Id)
            .HasColumnName("FlightsId");
            modelBuilder.Entity<Reservation>().Property(b => b.Id)
            .HasColumnName("ReservationId");
            modelBuilder.Entity<User>().Property(b => b.Id)
                .HasColumnName("UserId");

            modelBuilder.Entity<Flight>().HasOne(c => c.Airplane)
                .WithMany(e => e.Flights).IsRequired();
        }
    }
}
