//using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Internal;
//using Microsoft.Extensions.Logging;
//using Microsoft.Identity.Client;
//using Microsoft.IdentityModel.Tokens;
//using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure.Internal;
using server.DataTransferObjects;
using server.Models;
using server.Services;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly AppDbContext _context;
    private readonly SupabaseStorageService _storageService;
    private readonly TokenService _tokenService;
    private readonly PasswordService _passwordService;


    public IActionResult ProductDetalis()
    {
        return View();
    }



    public HomeController(ILogger<HomeController> logger, AppDbContext context, SupabaseStorageService storageService, TokenService tokenService, PasswordService passwordService)
    {
        _logger = logger;
        _context = context;
        _storageService = storageService;
        _tokenService = tokenService;
        _passwordService = passwordService;
    }
    public string GetContentType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        switch (extension)
        {
            case ".jpg":
            case ".jpeg":
                return "image/jpeg";
            case ".png":
                return "image/png";
            case ".gif":
                return "image/gif";
            case ".bmp":
                return "image/bmp";
            case ".tiff":
                return "image/tiff";
            // Добавьте другие типы файлов по необходимости
            default:
                return "application/octet-stream"; // Обработчик по умолчанию
        }
    }


    interface IAnimal
    {
        string Name { get; set; }
        void Speak()
        {
            Console.WriteLine("hi");
        }
    }




    [HttpGet]
    public IActionResult Index()
    {
        

        return View();

        
    }


    [HttpGet("productByCategory")]
    public async Task<IActionResult> GetProductsByCategory()
    {
        var groupedProducts = await _context.Products
            .GroupBy(p => p.category)
            .Select(g => new
            {
                name = g.Key,
                products = g.ToList()
            })
            .ToListAsync();

        var totalCategoriesCount = await _context.Products
            .Select(p => p.category)
            .Distinct()
            .CountAsync();



        Response.Headers.Add("X-Total-Count", totalCategoriesCount.ToString());

        return Ok(groupedProducts); // Возвращаем JSON с данными
    }

    [HttpGet("/auth")]
    [Authorize(Roles ="admin")]
    public IActionResult autorizeHi()
    {
        return Ok("Hi");
    }

}
