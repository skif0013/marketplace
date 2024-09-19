using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server;
using server.Models;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;



public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly AppDbContext _context;

    public HomeController(ILogger<HomeController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<string> Index(string name, string email, string password)
    {
        Console.WriteLine($"{name} {email} {password}");

        var claims = new List<Claim> { new Claim(ClaimTypes.Name, name) };
        // создаем JWT-токен
        var jwt = new JwtSecurityToken(
              issuer: AuthOptions.ISSUER,
              audience: AuthOptions.AUDIENCE,
              claims: claims,
              expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
              signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));




        var user = new User
        {
            Name = name,
            Email = email,
            Password = password
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }


    public class AuthOptions
    {
        public const string ISSUER = "shopilyze"; // издатель токена
        public const string AUDIENCE = "MyAuthClient"; // потребитель токена
        const string KEY = "mysupersecret_secretsecretsecretkey!123";   // ключ для шифрации
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }

}