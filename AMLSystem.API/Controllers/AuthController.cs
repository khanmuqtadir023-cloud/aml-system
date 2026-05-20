using AMLSystem.API.Data;
using AMLSystem.API.DTOs;
using AMLSystem.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace AMLSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // --- SIGNUP (REGISTER) API ---
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto request)
        {
            // Check karein ke email pehle se toh nahi hai
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest("Bhai, yeh email pehle se registered hai!");
            }

            // Naya user banayein aur password ko encrypt karein
            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password) // Password secure ho raha hai
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Welcome! You have been logged in." });
        }

        // --- LOGIN API ---
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto request)
        {
            // User ko uske email se dhoondein
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("User is not found with this email.");
            }

            // Password check karein
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Password is incorrect.");
            }

            return Ok(new { message = $"Welcome back, {user.FullName}!", userId = user.Id });
        }
    }
}