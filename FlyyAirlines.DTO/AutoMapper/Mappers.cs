using AutoMapper;
using FlyyAirlines.Models;

namespace FlyyAirlines.DTO.AutoMapper
{
    public class Mappers : Profile
    {
        public Mappers()
        {
            CreateMap<Reservation, ReservationDTO>();
            CreateMap<Flight, FlightDTO>();
            CreateMap<Employee, EmployeeAddDTO>();
            
        }
    }
}
