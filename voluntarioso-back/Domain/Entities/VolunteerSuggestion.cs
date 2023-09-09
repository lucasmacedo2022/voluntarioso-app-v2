namespace Domain.Entities
{
    public class VolunteerSuggestion
    {
        public int VolunteerId { get; set; }
        public int OngId { get; set; }
        public string Suggestions { get; set; } = string.Empty;
    }
}
