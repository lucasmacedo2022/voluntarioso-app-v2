namespace Domain.Entities
{
	public sealed record Project
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? Goal { get; set; }
		public string? Category { get; set; }
		public string? Expertise { get; set; }
		public string? Infrastructure { get; set; }
		public int VolunteerId { get; set; }
	}
}
