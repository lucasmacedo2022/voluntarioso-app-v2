namespace Domain.Entities
{
    public sealed record ONGVolunteer
    {
        public int ONGVolunId { get; set; }
        public int OngId { get; set; }
        public int VolunteerId { get; set; }
        public bool VolunteerApproved { get; set; }
        public string Suggestions { get; set; } = string.Empty;
    }
}