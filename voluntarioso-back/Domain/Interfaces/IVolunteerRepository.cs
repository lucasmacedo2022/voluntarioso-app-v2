using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IVolunteerRepository
    {
        Task<List<ONG>> GetONGs();
        Task VolunteerToONG(int voluntario, int ongId);
        Task<Volunteer>? GetByEmail(string voluntarioEmail);
        Task<bool> Register(Volunteer voluntario);
    }
}
