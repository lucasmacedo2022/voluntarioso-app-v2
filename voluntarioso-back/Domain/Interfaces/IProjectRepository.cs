using Domain.Entities;

namespace Domain.Interfaces
{
	public interface IProjectRepository
	{
		Task<List<Project>> GetProjects();
		Task<bool> Register(Project project);
	}
}
