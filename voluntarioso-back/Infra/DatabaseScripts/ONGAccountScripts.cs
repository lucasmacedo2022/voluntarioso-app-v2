namespace Infra.DatabaseScripts
{
    public class ONGAccountScripts
    {
        public const string Login = @"
            SELECT * 
            FROM ONGs
            WHERE Email LIKE @email
        ";
        
        public const string Register = @"
            INSERT INTO ONGs
                (Email, Password, Name, CNPJ, Category, Mission, Actions, Cause)
            VALUES 
                (@email, @password, @name, @cnpj, @category, @mission, @actions, @cause)
        ";
    }
}
