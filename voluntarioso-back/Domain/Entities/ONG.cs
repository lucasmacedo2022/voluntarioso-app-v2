namespace Domain.Entities
{
    public sealed record ONG
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string CNPJ { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Mission { get; set; } = string.Empty;
        public string Actions { get; set; } = string.Empty;
        public string Cause { get; set; } = string.Empty;
        public List<ONGVolunteer> OngVolunteers { get; set; } = new();
        public List<Volunteer> Volunteers { get; set; } = new();
    }
}
