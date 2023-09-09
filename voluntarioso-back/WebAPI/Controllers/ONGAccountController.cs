using Application.Interfaces.ONGs;
using Application.Models;
using Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ONGAccountController : ControllerBase
    {
        private readonly IONGAccountService _contaONGService;
        private readonly IValidator<ONG> _ongValidator;
        private readonly IValidator<Login> _loginONGValidator;

        public ONGAccountController(IONGAccountService contaONGService,
            IValidator<ONG> ongValidator,
            IValidator<Login> loginONGValidator)
        {
            _contaONGService = contaONGService;
            _ongValidator = ongValidator;
            _loginONGValidator = loginONGValidator;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(ONG ong)
        {
            try
            {
                var validatorResult = _ongValidator.Validate(ong);

                if (!validatorResult.IsValid)
                    return BadRequest(new { errors = validatorResult.Errors.Select(x => x.ErrorMessage) });

                var result = await _contaONGService.Register(ong);

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
        public async Task<IActionResult> Login(Login loginONGDto)
        {
            try
            {
                var validatorResult = _loginONGValidator.Validate(loginONGDto);

                if (!validatorResult.IsValid)
                    return BadRequest(new { errors = validatorResult.Errors.Select(x => x.ErrorMessage) });

                var result = await _contaONGService.Login(loginONGDto);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
