using Application.Interfaces.Projects;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services.Projects
{
	public class ProjectService : IProjectService
	{
		private readonly IProjectRepository _projectRepository;

		public ProjectService(IProjectRepository projectRepository)
		{
			_projectRepository = projectRepository;
		}

		public async Task<List<Project>> GetProjects()
		{
			var entities = await _projectRepository.GetProjects();

			return entities;
		}

		public async Task<bool> Register(Project project)
		{
			var result = await _projectRepository.Register(project);

			return result;
		}
	}
}
