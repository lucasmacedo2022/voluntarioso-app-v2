namespace Application.Models
{
    public class JWTToken
    {
        public string? Token { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
