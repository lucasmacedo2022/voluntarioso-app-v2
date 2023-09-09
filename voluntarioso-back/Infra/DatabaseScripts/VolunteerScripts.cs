namespace Infra.DatabaseScripts
{
    internal class VolunteerScripts
    {
        public const string GetAllONGs = "SELECT * FROM ONGs";
        public const string VolunteerToONG = @"
            INSERT INTO ONGVolunteers
                (OngId, VolunteerId, VolunteerApproved)
            VALUES 
                (@ongId, @volunteerId, @volunteerApproved)
        ";
    }
}
