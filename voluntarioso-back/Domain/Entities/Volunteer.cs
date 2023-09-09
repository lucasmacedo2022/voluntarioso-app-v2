namespace Domain.Entities
{
	public sealed class Volunteer
	{
		public int VolunId { get; set; }
		public string VolunEmail { get; set; } = string.Empty;
		public string VolunPassword { get; set; } = string.Empty;
		public string VolunName { get; set; } = string.Empty;
		public string VolunCPF { get; set; } = string.Empty;
		public DateTime VolunBirthDate { get; set; }
		public string VolunSuggestions { get; set; } = string.Empty;
        public List<ONG>? Ongs { get; set; }
		public List<ONGVolunteer>? OngVoluntarios { get; set; }
		public List<Project>? Projects { get; set; }
	}
}
