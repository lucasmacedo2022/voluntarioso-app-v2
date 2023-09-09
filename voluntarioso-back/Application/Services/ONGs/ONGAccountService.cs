using Application.Interfaces.ONGs;
using Application.Models;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Application.Services.ONGs
{
	public class ONGAccountService : IONGAccountService
	{
		private readonly IONGRepository _ongRepository;
		private readonly IOptions<JWTConfig> _jwtConfig;

		public ONGAccountService(IONGRepository ongRepository, IOptions<JWTConfig> jwtConfig)
		{
			_ongRepository = ongRepository;
			_jwtConfig = jwtConfig;
		}

		public async Task<JWTToken> Login(Login entity)
		{
			var ong = await _ongRepository.GetByEmail(entity.Email)!;

			if (ong == null)
				throw new Exception($"No ONG found for the provided email: [{entity.Email}]");

			if (!BCrypt.Net.BCrypt.Verify(entity.Password, ong.Password))
				throw new Exception("Incorrect password");

			return GenerateToken(ong);
		}

		public async Task<bool> Register(ONG entity)
		{
			var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
			var hashedPassword = BCrypt.Net.BCrypt.HashPassword(entity.Password, salt);

			entity.Password = hashedPassword;

			var result = await _ongRepository.Register(entity);

			return result;
		}

		private JWTToken GenerateToken(ONG entity)
		{
			var tokenHandler = new JwtSecurityTokenHandler
			{
				SetDefaultTimesOnTokenCreation = false
			};
			var tokenKey = Encoding.UTF8.GetBytes(_jwtConfig.Value.Key!);
			var expirationTime = DateTime.Now.AddMinutes(60);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				  {
					new Claim("id", entity.Id.ToString()),
					new Claim(ClaimTypes.Email, entity.Email!),
					new Claim("name", entity.Name),
					new Claim("cnpj", entity.CNPJ),
					new Claim("category", entity.Category),
					new Claim("mission", entity.Mission),
					new Claim("actions", entity.Actions),
					new Claim("cause", entity.Cause),
					new Claim(ClaimTypes.Role, "ONG")
				  }),
				Expires = expirationTime,
				SigningCredentials = new SigningCredentials(
					new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return new JWTToken { Token = tokenHandler.WriteToken(token), ExpiresAt = expirationTime };
		}
	}
}
