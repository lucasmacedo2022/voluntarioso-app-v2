using Application.Interfaces.Volunteers;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services.Volunteers
{
    public class VolunteerService : IVolunteerService
    {
        private readonly IVolunteerRepository _voluntarioRepository;

        public VolunteerService(IVolunteerRepository voluntarioRepository)
        {
            _voluntarioRepository = voluntarioRepository;
        }

        public async Task<List<ONG>> GetONGs()
        {
            var result = await _voluntarioRepository.GetONGs();

            return result;
        }

        public async Task VolunteerToONG(int volunteerId, int ongId)
        {
            await _voluntarioRepository.VolunteerToONG(volunteerId, ongId);
        }
    }
}
