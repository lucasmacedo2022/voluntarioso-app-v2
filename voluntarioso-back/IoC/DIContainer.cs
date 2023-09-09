using Application.Interfaces.ONGs;
using Application.Interfaces.Projects;
using Application.Interfaces.Volunteers;
using Application.Models;
using Application.Services.ONGs;
using Application.Services.Projects;
using Application.Services.Volunteers;
using Application.Validation;
using Domain.Entities;
using Domain.Interfaces;
using FluentValidation;
using Infra.Context;
using Infra.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace IoC
{
	public static class DIContainer
	{
		public static IServiceCollection StartServices(this IServiceCollection services, IConfiguration config)
		{
			services.AddSingleton<DataContext>();

			services.AddScoped<IONGRepository, ONGRepository>();
			services.AddScoped<IVolunteerRepository, VolunteerRepository>();
			services.AddScoped<IProjectRepository, ProjectRepository>();

			services.AddScoped<IONGAccountService, ONGAccountService>();
			services.AddScoped<IVolunteerAccountService, VolunteerAccountService>();
			services.AddScoped<IONGService, ONGService>();
			services.AddScoped<IVolunteerService, VolunteerService>();
			services.AddScoped<IProjectService, ProjectService>();

			services.AddScoped<IValidator<Login>, VolunteerAccountValidation>();
			services.AddScoped<IValidator<Login>, ONGAccountValidation>();
			services.AddScoped<IValidator<Volunteer>, VolunteerValidation>();
			services.AddScoped<IValidator<ONG>, ONGValidation>();
			services.AddScoped<IValidator<Project>, ProjectValidation>();

			services.AddAuthentication(x =>
			 {
				 x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				 x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			 }).AddJwtBearer(o =>
			 {
				 var key = Encoding.UTF8.GetBytes(config.GetValue<string>("JWTConfig:Key"));
				 o.SaveToken = true;
				 o.TokenValidationParameters = new TokenValidationParameters
				 {
					 ValidateIssuer = false,
					 ValidateAudience = false,
					 ValidateLifetime = true,
					 ValidateIssuerSigningKey = true,
					 ValidIssuer = config.GetValue<string>("JWTConfig:Issuer"),
					 ValidAudience = config.GetValue<string>("JWTConfig:Audience"),
					 IssuerSigningKey = new SymmetricSecurityKey(key),
					 ClockSkew = TimeSpan.Zero
				 };
			 });

			services.AddSwaggerGen(c =>
			{
				c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
				{
					Name = "Authorization",
					Type = SecuritySchemeType.ApiKey,
					Scheme = "Bearer",
					BearerFormat = "JWT",
					In = ParameterLocation.Header,
					Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] " +
						"and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
				});

				c.AddSecurityRequirement(new OpenApiSecurityRequirement
				{
					{
						new OpenApiSecurityScheme
						{
							Reference = new OpenApiReference
							{
								Type = ReferenceType.SecurityScheme,
								Id = "Bearer"
							}
						},
						Array.Empty<string>()
					}
				});
			});

			return services;
		}
	}
}
