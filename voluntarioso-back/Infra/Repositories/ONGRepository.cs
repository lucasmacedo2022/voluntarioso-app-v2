using Dapper;
using Domain.Entities;
using Domain.Interfaces;
using Infra.Context;
using Infra.DatabaseScripts;
using System.Data;

namespace Infra.Repositories
{
    public class ONGRepository : IONGRepository
    {
        private readonly DataContext _context;
        private readonly IDbConnection _conn;

        public ONGRepository(DataContext context)
        {
            _context = context;
            _conn = _context.CreateConnection();
        }

        public async Task<List<ONG>> GetONGVolunteers(int ongId)
        {
            var sqlQuery = ONGScripts.GetONGVolunteers;
            var parameters = new { ongId };

            var entities = await _conn.QueryAsync<ONG, ONGVolunteer, Volunteer, ONG>
                (sqlQuery, (ong, ongVoluntario, voluntario) =>
                {
                    ong.OngVolunteers.Add(ongVoluntario);
                    ong.Volunteers.Add(voluntario);

                    return ong;
                }, parameters, splitOn: "ONGVolunId, VolunId");

            var result = entities.GroupBy(x => x.Id).Select(y =>
            {
                var groupedONG = y.First();
                groupedONG.OngVolunteers = y.Select(z => z.OngVolunteers.Single()).ToList();
                groupedONG.Volunteers = y.Select(z => z.Volunteers.Single()).ToList();

                return groupedONG;
            });

            return result.ToList();
        }

        public async Task<ONG> GetONGById(int ongId)
        {
            var sqlQuery = ONGScripts.GetONGById;
            var parameters = new { ongId };

            var entity = await _conn.QueryFirstOrDefaultAsync<ONG>(sqlQuery, parameters);

            return entity;
        }

        public async Task<ONG>? GetByEmail(string ongEmail)
        {
            var sqlQuery = ONGAccountScripts.Login;
            var parameters = new { email = ongEmail };

            var entity = await _conn.QueryFirstOrDefaultAsync<ONG>(sqlQuery, parameters);

            return entity;
        }

        public async Task<bool> Register(ONG ong)
        {
            var ongEntity = await GetByEmail(ong.Email)!;

            if (ongEntity != null)
                throw new Exception($"ONG with email {ongEntity!.Email} already exist!");

            var sqlQuery = ONGAccountScripts.Register;
            var parameters = new
            {
                email = ong.Email,
                password = ong.Password,
                name = ong.Name,
                cnpj = ong.CNPJ,
                category = ong.Category,
                mission = ong.Mission,
                actions = ong.Actions,
                cause = ong.Cause,
            };

            var entity = await _conn.ExecuteAsync(sqlQuery, parameters);

            return entity > 0;
        }

        public async Task<bool> AcceptVolunteer(int volunteerId, int ongId)
        {
            var sqlQuery = ONGScripts.AcceptVolunteeer;
            var parameters = new { ongId, volunteerId };

            var result = await _conn.ExecuteAsync(sqlQuery, parameters);

            return result > 0;
        }

        public async Task<bool> RemoveVolunteer(int volunteerId, int ongId)
        {
            var sqlQuery = ONGScripts.RemoveVolunteer;
            var parameters = new { ongId, volunteerId };

            var result = await _conn.ExecuteAsync(sqlQuery, parameters);

            return result > 0;
        }
    }
}
