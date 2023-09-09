using Dapper;
using Domain.Entities;
using Domain.Interfaces;
using Infra.Context;
using Infra.DatabaseScripts;
using System.Data;

namespace Infra.Repositories
{
    public class VolunteerRepository : IVolunteerRepository
    {
        private readonly DataContext _context;
        private readonly IDbConnection _conn;

        public VolunteerRepository(DataContext context)
        {
            _context = context;
            _conn = _context.CreateConnection();
        }

        public async Task<List<ONG>> GetONGs()
        {
            using var conn = _context.CreateConnection();
            var sqlQuery = VolunteerScripts.GetAllONGs;

            var entities = (await conn.QueryAsync<ONG>(sqlQuery)).ToList();

            return entities;
        }

        public async Task VolunteerToONG(int volunteerId, int ongId)
        {
            var sqlQuery = VolunteerScripts.VolunteerToONG;
            var parameters = new
            {
                ongId,
                volunteerId,
                volunteerApproved = false
            };

            await _conn.ExecuteAsync(sqlQuery, parameters);
        }

        public async Task<Volunteer>? GetByEmail(string voluntarioEmail)
        {
            var sqlQuery = VolunteerAccountScripts.Login;
            var parameters = new { email = voluntarioEmail };

            var entity = await _conn.QueryFirstOrDefaultAsync<Volunteer>(sqlQuery, parameters);

            return entity;
        }

        public async Task<bool> Register(Volunteer voluntario)
        {
            var volunEntity = await GetByEmail(voluntario.VolunEmail)!;

            if (volunEntity != null)
                throw new Exception($"Volunteer with email {volunEntity!.VolunEmail} already exist!");

            var sqlQuery = VolunteerAccountScripts.Register;
            var parameters = new
            {
                email = voluntario.VolunEmail,
                password = voluntario.VolunPassword,
                name = voluntario.VolunName,
                cpf = voluntario.VolunCPF,
                birthDate = voluntario.VolunBirthDate,
            };

            var entity = await _conn.ExecuteAsync(sqlQuery, parameters);

            return entity > 0;
        }
    }
}
