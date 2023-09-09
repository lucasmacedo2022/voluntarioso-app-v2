using Domain.Entities;

namespace Application.Interfaces.Volunteers
{
    public interface IVolunteerService
    {
        Task<List<ONG>> GetONGs();
        Task VolunteerToONG(int voluntarioId, int ongId);
    }
}
