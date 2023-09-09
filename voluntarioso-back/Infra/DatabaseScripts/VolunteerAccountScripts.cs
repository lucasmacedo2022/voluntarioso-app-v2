namespace Infra.DatabaseScripts
{
	public class VolunteerAccountScripts
	{
		public const string Login = @"
            SELECT *
            FROM Volunteers
            WHERE VolunEmail LIKE @email
        ";

		public const string Register = @"
            INSERT INTO Volunteers
                (VolunEmail, VolunPassword, VolunName, VolunCPF, VolunBirthDate)
            VALUES 
                (@email, @password, @name, @cpf, @birthDate)
        ";
	}
}
