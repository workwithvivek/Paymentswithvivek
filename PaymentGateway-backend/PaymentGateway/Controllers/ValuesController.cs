using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentGateway.Domain.DataAccessLayer.DTO;
using PaymentGateway.Service.IService;

namespace PaymentGateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IConfiguration _config;

        public ValuesController(IJwtTokenService jwtTokenService, IConfiguration config)
        {
            _jwtTokenService = jwtTokenService;
            _config = config;
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleAuthDto googleAuthDto)
        {
            try
            {
                // Validate the Google token
                var payload = await GoogleJsonWebSignature.ValidateAsync(googleAuthDto.Token, new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { _config["GoogleAuthSettings:ClientId"] }
                });

              
                var token = _jwtTokenService.GenerateToken(payload.Subject); 

                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
