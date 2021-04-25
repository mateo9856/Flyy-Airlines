using AutoMapper;
using FlyyAirlines.Models;

namespace FlyyAirlines.DTO.AutoMapper
{
    public class Mappers : Profile
    {
        public Mappers()
        {
            CreateMap<User, UserDTO>();
            CreateMap<Reservation, ReservationDTO>();
            CreateMap<Flight, FlightDTO>();
            CreateMap<Employee, EmployeeDTO>();
        }
    }
}
