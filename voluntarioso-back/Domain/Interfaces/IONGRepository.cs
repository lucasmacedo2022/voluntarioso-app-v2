using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IONGRepository
    {
        Task<List<ONG>> GetONGVolunteers(int ongId);
        Task<ONG> GetONGById(int ongId);
        Task<ONG>? GetByEmail(string ongEmail);
        Task<bool> Register(ONG ong);
        Task<bool> AcceptVolunteer(int volunteerId, int ongId);
        Task<bool> RemoveVolunteer(int volunteerId, int ongId);
    }
}
