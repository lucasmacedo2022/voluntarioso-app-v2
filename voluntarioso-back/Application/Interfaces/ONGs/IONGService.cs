using Domain.Entities;

namespace Application.Interfaces.ONGs
{
    public interface IONGService
    {
        Task<List<ONG>> GetONGVolunteers(int ongId);
        Task<ONG> GetONGById(int ongId);
        Task<bool> AcceptVolunteer(int voluntarioId, int ongId);
        Task<bool> RemoveVolunteer(int voluntarioId, int id);
    }
}
