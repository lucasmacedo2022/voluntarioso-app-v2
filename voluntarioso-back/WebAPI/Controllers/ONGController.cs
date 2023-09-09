using Application.Interfaces.ONGs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ONGController : ControllerBase
    {
        private readonly IONGService _ongService;

        public ONGController(IONGService ongService)
        {
            _ongService = ongService;
        }

        [Authorize]
        [HttpGet("ong-volunteer/{ongId}")]
        public async Task<IActionResult> GetONGVolunteers(int ongId)
        {
            try
            {
                var result = await _ongService.GetONGVolunteers(ongId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Volunteer")]
        [HttpGet("{ongId}")]
        public async Task<IActionResult> GetONGById(int ongId)
        {
            try
            {
                var result = await _ongService.GetONGById(ongId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "ONG")]
        [HttpPut]
        public async Task<IActionResult> AcceptVolunteer([Required] int volunteerId, [Required] int ongId)
        {
            try
            {
                var result = await _ongService.AcceptVolunteer(volunteerId, ongId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "ONG")]
        [HttpDelete]
        public async Task<IActionResult> RemoveVolunteer([Required] int volunteerId, [Required] int ongId)
        {
            try
            {
                var result = await _ongService.RemoveVolunteer(volunteerId, ongId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
