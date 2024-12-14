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
using Microsoft.Identity.Client;

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


    // поменять структуру кода
    public HomeController(ILogger<HomeController> logger, AppDbContext context, SupabaseStorageService storageService, TokenService tokenService, PasswordService passwordService)
    {
        _logger = logger;
        _context = context;
        _storageService = storageService;
        _tokenService = tokenService;
        _passwordService = passwordService;
    }

    public IActionResult AddCategories()
    {
        // Проверяем, есть ли уже категории в базе данных, чтобы не добавить их несколько раз
        if (!_context.Categories.Any())
        {
            // Создаем родительскую категорию "Процессоры"
            var parentCategory = new Category
            {
                name = "Процессоры",
            };

            // Создаем подкатегории "AMD" и "Intel"
            var subCategory1 = new Category
            {
                name = "AMD",
                ParentCategory = parentCategory  // Устанавливаем родительскую категорию
            };

            var subCategory2 = new Category
            {
                name = "Intel",
                ParentCategory = parentCategory  // Устанавливаем родительскую категорию
            };

            // Добавляем все категории в контекст базы данных
            _context.Categories.Add(parentCategory);
            _context.Categories.Add(subCategory1);
            _context.Categories.Add(subCategory2);

            // Сохраняем изменения в базе данных
            _context.SaveChanges();
        }

        // Возвращаем результат
        return Ok("Категории добавлены");
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
            // Äîáàâüòå äðóãèå òèïû ôàéëîâ ïî íåîáõîäèìîñòè
            default:
                return "application/octet-stream"; // Îáðàáîò÷èê ïî óìîë÷àíèþ
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
        // Группируем товары по родительским категориям и подкатегориям
        var groupedProducts = await _context.Categories
            .Include(c => c.SubCategory)  // Загружаем подкатегории
            .Include(c => c.Products)     // Загружаем товары
            .Select(c => new
            {
                category = c,
                subCategories = c.SubCategory.Select(sc => new
                {
                    subCategory = sc,
                    products = sc.Products.ToList() // Товары подкатегории
                }).ToList(),
                products = c.Products.ToList()  // Товары родительской категории
            })
            .ToListAsync();

        // Считаем общее количество категорий (родительских и подкатегорий)
        var totalCategoriesCount = await _context.Categories
            .Select(c => c.id)
            .Distinct()
            .CountAsync();

        Response.Headers.Add("X-Total-Count", totalCategoriesCount.ToString());

        return Ok(groupedProducts); // Возвращаем категории с подкатегориями и товарами
    }




    [HttpGet("/auth")]
    [Authorize(Roles ="admin")]
    public IActionResult autorizeHi()
    {
        return Ok("Hi");
    }

}
