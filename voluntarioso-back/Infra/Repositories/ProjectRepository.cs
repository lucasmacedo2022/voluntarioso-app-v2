using Dapper;
using Domain.Entities;
using Domain.Interfaces;
using Infra.Context;
using Infra.DatabaseScripts;
using System.Data;

namespace Infra.Repositories
{
	public class ProjectRepository : IProjectRepository
	{
		private readonly DataContext _context;
		private readonly IDbConnection _conn;

		public ProjectRepository(DataContext context)
		{
			_context = context;
			_conn = _context.CreateConnection();
		}

		public async Task<List<Project>> GetProjects()
		{
			using var conn = _context.CreateConnection();
			var sqlQuery = ProjectScripts.GetProjects;

			var entities = (await conn.QueryAsync<Project>(sqlQuery)).ToList();

			return entities;
		}

		public async Task<bool> Register(Project project)
		{
			var isVolunteerExist = await CheckByVolunteerId(project.VolunteerId);

			if (project.VolunteerId == 0 || !isVolunteerExist)
				throw new InvalidOperationException($"{nameof(Project.VolunteerId)} equal to {project.VolunteerId} doesn't exist");

			var sqlQuery = ProjectScripts.Register;
			var parameters = new
			{
				name = project.Name,
				goal = project.Goal,
				category = project.Category,
				expertise = project.Expertise,
				infrastructure = project.Infrastructure,
				volunteerId = project.VolunteerId,
			};

			var entity = await _conn.ExecuteAsync(sqlQuery, parameters);

			return entity > 0;
		}

		private async Task<bool> CheckByVolunteerId(int volunteerId)
		{
			var sqlQuery = ProjectScripts.CheckByVolunteerId;
			var parameters = new
			{
				volunId = volunteerId
			};

			var volunteerExist = await _conn.ExecuteScalarAsync<bool>(sqlQuery, parameters);

			return volunteerExist;
		}
	}
}
