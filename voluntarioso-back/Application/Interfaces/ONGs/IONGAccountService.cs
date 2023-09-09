using Application.Models;
using Domain.Entities;

namespace Application.Interfaces.ONGs
{
    public interface IONGAccountService
    {
        Task<JWTToken> Login(Login entity);
        Task<bool> Register(ONG entity);
    }
}
