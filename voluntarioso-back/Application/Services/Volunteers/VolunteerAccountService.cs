using Application.Interfaces.Volunteers;
using Application.Models;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Application.Services.Volunteers
{
	public class VolunteerAccountService : IVolunteerAccountService
	{
		private readonly IVolunteerRepository _voluntarioRepository;
		private readonly IOptions<JWTConfig> _jwtConfig;

		public VolunteerAccountService(IVolunteerRepository voluntarioRepository, IOptions<JWTConfig> jwtConfig)
		{
			_voluntarioRepository = voluntarioRepository;
			_jwtConfig = jwtConfig;
		}

		public async Task<JWTToken> Login(Login entity)
		{
			var voluntario = await _voluntarioRepository.GetByEmail(entity.Email)!;

			if (voluntario == null || !BCrypt.Net.BCrypt.Verify(entity.Password, voluntario.VolunPassword))
				throw new Exception("Nenhum voluntário encontrado");


			return GenerateToken(voluntario);
		}

		public async Task<bool> Register(Volunteer entity)
		{
			var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
			var hashedPassword = BCrypt.Net.BCrypt.HashPassword(entity.VolunPassword, salt);

			entity.VolunPassword = hashedPassword;

			var result = await _voluntarioRepository.Register(entity);

			return result;
		}

		private JWTToken GenerateToken(Volunteer entity)
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
					new Claim("volunId", entity.VolunId.ToString()),
					new Claim("volunEmail", entity.VolunEmail!),
					new Claim("volunName", entity.VolunName),
					new Claim("volunCPF", entity.VolunCPF),
					new Claim("volunBirthDate", entity.VolunBirthDate.ToString()),
					new Claim(ClaimTypes.Role, "Volunteer")
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
