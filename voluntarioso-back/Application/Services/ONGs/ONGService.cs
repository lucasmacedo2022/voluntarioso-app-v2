using Application.Interfaces.ONGs;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services.ONGs
{
    public class ONGService : IONGService
    {
        private readonly IONGRepository _ongRepository;

        public ONGService(IONGRepository ongRepository)
        {
            _ongRepository = ongRepository;
        }

        public async Task<List<ONG>> GetONGVolunteers(int ongId)
        {
            var result = await _ongRepository.GetONGVolunteers(ongId);

            return result;
        }

        public async Task<ONG> GetONGById(int ongId)
        {
            var result = await _ongRepository.GetONGById(ongId);

            return result;
        }

        public async Task<bool> AcceptVolunteer(int volunteerId, int ongId)
        {
            var result = await _ongRepository.AcceptVolunteer(volunteerId, ongId);

            return result;
        }

        public async Task<bool> RemoveVolunteer(int volunteerId, int ongId)
        {
            var result = await _ongRepository.RemoveVolunteer(volunteerId, ongId);

            return result;
        }
    }
}
