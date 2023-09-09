namespace Infra.DatabaseScripts
{
    internal class ONGScripts
    {
        public const string GetONGVolunteers = @"    
            SELECT * FROM ONGs o
            INNER JOIN ONGVolunteers ov
            ON o.Id == ov.OngId
            INNER JOIN Volunteers v
            ON ov.VolunteerId == v.VolunId
            WHERE o.Id == @ongId
        ";

        public const string GetONGById = @"
            SELECT * FROM ONGs WHERE Id = @ongId
        ";

        public const string AcceptVolunteeer = @"
            UPDATE ONGVolunteers 
            SET VolunteerApproved = true
            WHERE OngId == @ongId AND VolunteerId == @volunteerId
        ";
        
        public const string RemoveVolunteer = @"
            DELETE FROM ONGVolunteers 
            WHERE OngId == @ongId AND VolunteerId == @volunteerId
        ";
    }
}
