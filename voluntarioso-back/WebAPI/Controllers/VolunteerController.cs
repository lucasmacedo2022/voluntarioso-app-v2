using Application.Interfaces.Projects;
using Application.Interfaces.Volunteers;
using Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class VolunteerController : ControllerBase
	{
		private readonly IVolunteerService _voluntarioService;
		private readonly IProjectService _projectService;
		private readonly IValidator<Project> _projectValidator;

		public VolunteerController(IVolunteerService voluntarioService,
			IProjectService projectService,
			IValidator<Project> projectValidator)
		{
			_voluntarioService = voluntarioService;
			_projectService = projectService;
			_projectValidator = projectValidator;
		}

		/// <summary>
		/// Lista os itens da To-do list.
		/// </summary>
		/// <returns>Os itens da To-do list</returns>
		/// <response code="200">Returna os itens da To-do list cadastrados</response>
		[Authorize(Roles = "Volunteer")]
		[HttpGet]
		public async Task<IActionResult> ObterONGs()
		{
			try
			{
				var result = await _voluntarioService.GetONGs();

				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Volunteer")]
		[HttpGet]
		[Route("get-projects")]
		public async Task<IActionResult> GetProjects()
		{
			try
			{
				var result = await _projectService.GetProjects();

				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Volunteer")]
		[HttpPost]
		public async Task<IActionResult> VolunteerToONG([Required] int volunteerId, [Required] int ongId)
		{
			try
			{
				await _voluntarioService.VolunteerToONG(volunteerId, ongId);

				return NoContent();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[Authorize(Roles = "Volunteer")]
		[HttpPost]
		[Route("project-register")]
		public async Task<IActionResult> ProjectRegister(Project project)
		{
			try
			{
				var validatorResult = _projectValidator.Validate(project);

				if (!validatorResult.IsValid)
					return BadRequest(new { errors = validatorResult.Errors.Select(x => x.ErrorMessage) });

				var result = await _projectService.Register(project);

				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
