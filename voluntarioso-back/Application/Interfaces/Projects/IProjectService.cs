using Domain.Entities;

namespace Application.Interfaces.Projects
{
	public interface IProjectService
	{
		Task<List<Project>> GetProjects();
		Task<bool> Register(Project project);
	}
}
