using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure.Internal;
using server;
using server.Models;
using server.Services;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly AppDbContext _context;
    private readonly SupabaseStorageService _storageService;
    private readonly TokenService _tokenService;


    public HomeController(ILogger<HomeController> logger, AppDbContext context, SupabaseStorageService storageService, TokenService tokenService)
    {
        _logger = logger;
        _context = context;
        _storageService = storageService;
        _tokenService = tokenService;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public async Task<IActionResult> Catalog(string search, string sort, string producer)
    {
        // Получаем все продукты из базы данных
        var products = await _context.Products.ToListAsync();

        // Фильтрация по названию товара (если указан параметр поиска)
        if (!string.IsNullOrEmpty(search))
        {
            products = products.Where(p => p.Title.Contains(search, StringComparison.OrdinalIgnoreCase)).ToList();
        }



        if (!string.IsNullOrEmpty(producer))
        {
            products = products.Where(p => p.Category.Contains(producer, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        // Сортировка
        switch (sort)
        {
            case "price_asc":
                products = products.OrderBy(p => p.Price).ToList();
                break;
            case "price_desc":
                products = products.OrderByDescending(p => p.Price).ToList();
                break;
            default:
                break;
        }



        return Ok(products);
    }


    [HttpGet]
    public async Task<IActionResult> ProductDetails(int id)
    {
        // Ищем продукт по ID
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

        // Если продукт не найден, возвращаем ошибку 404
        if (product == null)
        {
            return NotFound();
        }

        return View(product);
    }



    [HttpPost]
    public async Task<IActionResult> Index(User user)
    {

        Console.WriteLine($"{user.Name} {user.Email}, {user.Password}");

        bool userExists = await _context.Users
       .AnyAsync(u => u.Name == user.Name && u.Email == user.Email);

        if (userExists)
        {
            return NotFound();
        }

        var abc = new User
        {
            Name = user.Name,
            Email = user.Email,
            Password = user.Password,
            AccountRegistrationDate = DateTime.Now,
            RefreshToken = new RefreshToken { Token = "fdfd" }
        };

        // Генерация Access токена
        var accessToken = _tokenService.GenerateAccessToken(abc);

        // Генерация Refresh токена
        var refreshToken = _tokenService.GenerateRefreshToken(abc);



        var newUser = new User
        {
            Name = user.Name,
            Email = user.Email,
            Password = user.Password,
            AccountRegistrationDate = DateTime.UtcNow,
            RefreshToken = new RefreshToken { Token = refreshToken }
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();



        

        Console.WriteLine($"Access Token: {accessToken}, Refresh Token: {refreshToken}");

        return Json(accessToken); // Возвращаем JSON-ответ с токенами
    }

    [HttpGet]
    public IActionResult ProductCreation()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> ProductCreation(string title, string description, string category, int price, IFormFile TitlePicture)
    {

        

        string pictureUrl = null;

        if (TitlePicture != null && TitlePicture.Length > 0)
        {
            var tempFilePath = Path.GetTempFileName();
            using (var stream = new FileStream(tempFilePath, FileMode.Create))
            {
                await TitlePicture.CopyToAsync(stream);
            }


            pictureUrl = await _storageService.loadFileAsync("data", tempFilePath, TitlePicture.FileName);
        }

        var newProduct = new Product
        {
            Title = title,

            TitlePictureUrl = pictureUrl,

            Description = description,

            Category = category,

            Price = price,

            Seller = "Shopilyze",
            
            Grade = 3
        };

        _context.Products.Add(newProduct);
        await _context.SaveChangesAsync();

        return RedirectToAction("Index");
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProductsByCategory()
    {
        var groupedProducts = await _context.Products
            .GroupBy(p => p.Category)
            .Select(g => new
            {
                name = g.Key,
                products = g.ToList()
            })
            .ToListAsync();

        return Ok(groupedProducts); // Возвращаем JSON с данными
    }


}





//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Logging;
//using Microsoft.IdentityModel.Tokens;
//using server;
//using server.Models;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;


//public class HomeController : Controller
//{
//    private readonly ILogger<HomeController> _logger;
//    private readonly AppDbContext _context;


//    public HomeController(ILogger<HomeController> logger, AppDbContext context)
//    {
//        _logger = logger;
//        _context = context;

//    }

//    [HttpGet]
//    public IActionResult Index()
//    {
//        return View();
//    }

//    [HttpPost]
//    public async Task<IActionResult> Index(string name, string email, string password, IFormFile profilePicture)
//    {

//            Console.WriteLine($"{name} {email} {password}");

//            var claims = new List<Claim> { new Claim(ClaimTypes.Name, name) };
//            var jwt = new JwtSecurityToken(
//                issuer: AuthOptions.ISSUER,
//                audience: AuthOptions.AUDIENCE,
//                claims: claims,
//                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
//                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
//            );



//        // Сохранение пользователя с URL фотографии в базу данных
//        var user = new User
//        {
//            Name = name,
//            Email = email,
//            Password = password, // Убедитесь, что здесь используется хэш пароля
//            ProfilePictureUrl = "1"
//        };

//            _context.Users.Add(user);
//            await _context.SaveChangesAsync();

//            var token = new JwtSecurityTokenHandler().WriteToken(jwt);
//            return Ok(token);
//    }



//    public class AuthOptions
//    {
//        public const string ISSUER = "shopilyze"; // издатель токена
//        public const string AUDIENCE = "MyAuthClient"; // потребитель токена
//        const string KEY = "mysupersecret_secretsecretsecretkey!123";   // ключ для хеширования
//        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
//            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
//    }

//}








//[HttpPost]
//public async Task<string> Index(string name, string email, string password)
//{
//    Console.WriteLine($"{name} {email} {password}");

//    var claims = new List<Claim> { new Claim(ClaimTypes.Name, name) };
//    // создаем JWT-токен
//    var jwt = new JwtSecurityToken(
//          issuer: AuthOptions.ISSUER,
//          audience: AuthOptions.AUDIENCE,
//          claims: claims,
//          expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
//          signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));




//    var user = new User
//    {
//        Name = name,
//        Email = email,
//        Password = password
//    };

//    _context.Users.Add(user);
//    await _context.SaveChangesAsync();

//    return new JwtSecurityTokenHandler().WriteToken(jwt);
//}


