using Application.Interfaces.Volunteers;
using Application.Models;
using Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteerAccountController : ControllerBase
    {
        private readonly IVolunteerAccountService _contaVoluntarioService;
        private readonly IValidator<Volunteer> _voluntarioValidator;
        private readonly IValidator<Login> _loginVoluntarioValidator;

        public VolunteerAccountController(IVolunteerAccountService contaVoluntarioService,
            IValidator<Volunteer> voluntarioValidator,
            IValidator<Login> loginVoluntarioValidator)
        {
            _contaVoluntarioService = contaVoluntarioService;
            _voluntarioValidator = voluntarioValidator;
            _loginVoluntarioValidator = loginVoluntarioValidator;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(Volunteer voluntario)
        {
            try
            {
                var validatorResult = _voluntarioValidator.Validate(voluntario);

                if (!validatorResult.IsValid)
                    return BadRequest(new { errors = validatorResult.Errors.Select(x => x.ErrorMessage) });

                var result = await _contaVoluntarioService.Register(voluntario);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(Login loginVoluntarioDto)
        {
            try
            {
                var validatorResult = _loginVoluntarioValidator.Validate(loginVoluntarioDto);

                if (!validatorResult.IsValid)
                    return BadRequest(new { errors = validatorResult.Errors.Select(x => x.ErrorMessage) });

                var result = await _contaVoluntarioService.Login(loginVoluntarioDto);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
