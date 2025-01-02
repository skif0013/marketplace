using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.DataTransferObjects;
namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public AdminController( AppDbContext context)
        {
            _context = context;
        }
        
        [HttpPost("FormForSeller")]
        public async Task<IActionResult> FormForSeller([FromForm] FormForSellerRequest formForSellerRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var NewForm = new FormForSeller
            {
                CompanyName = formForSellerRequest.CompanyName,
                WebsiteLink = formForSellerRequest.WebsiteLink,
                Name = formForSellerRequest.Name,
                Email = formForSellerRequest.Email,
                Position = formForSellerRequest.Position,
                CreatedAt = DateTime.UtcNow
            };

            _context.FormForSellers.Add(NewForm);
            await _context.SaveChangesAsync();
            
            return Ok();
        }
        
    }
}
