using Application.Models;
using Domain.Entities;

namespace Application.Interfaces.Volunteers
{
    public interface IVolunteerAccountService
    {
        Task<JWTToken> Login(Login entity);
        Task<bool> Register(Volunteer entity);
    }
}
