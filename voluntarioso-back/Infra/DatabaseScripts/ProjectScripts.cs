namespace Infra.DatabaseScripts
{
	internal class ProjectScripts
	{
		public const string GetProjects = @"
            SELECT *
            FROM Projects
        ";

		public const string Register = @"
            INSERT INTO Projects
                (Name, Goal, Category, Expertise, Infrastructure, VolunteerId)
            VALUES 
                (@name, @goal, @category, @expertise, @infrastructure, @volunteerId)
        ";

		public const string CheckByProjectId = @"
            SELECT 1  
            FROM Projects
            WHERE Id == @projectId
        ";

		public const string CheckByVolunteerId = @"
            SELECT 1  
            FROM Volunteers
            WHERE VolunId == @volunId
        ";

	}
}
