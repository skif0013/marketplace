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
//using BCrypt.Net.BCrypt.HashPassword;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;
//using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly AppDbContext _context;
    private readonly SupabaseStorageService _storageService;
    private readonly TokenService _tokenService;
    private readonly PasswordService _passwordService;


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
            // �������� ������ ���� ������ �� �������������
            default:
                return "application/octet-stream"; // ���������� �� ���������
        }
    }











    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    //[HttpPost("/singIn")]  // ����
    //public async Task<IActionResult> SingIn([FromForm] EUser user)
    //{

    //    if (user == null)
    //    {
    //        return BadRequest("������� ��� ������");
    //    }

    //    if (!ModelState.IsValid)
    //    {
    //        return BadRequest(ModelState);
    //    }

    //    var Euser = await _context.Users.FirstOrDefaultAsync(u => u.email == user.email && u.name == user.name);

    //    if (Euser == null)
    //    {
    //        return BadRequest("������ ����� �� ����������");
    //    }

    //    var result = BCrypt.Net.BCrypt.Verify(user.password, Euser.password);


        
    //    if (!result)
    //    {
    //        return BadRequest("�������� ������");
    //    }


    //    var accessToken = _tokenService.GenerateAccessToken(Euser);

    //    var refreshToken = _tokenService.GenerateRefreshToken(Euser);

    //    // ��������� Refresh ������ � HttpOnly ����
    //    var cookieOptions = new CookieOptions
    //    {
    //        HttpOnly = true,
    //        Secure = true, // ���������, ��� ������������ HTTPS
    //        SameSite = SameSiteMode.None, // ���� ���������� ��� �����-�������� ��������
    //        Expires = DateTime.UtcNow.AddDays(TokenService.AuthOptions.RefreshTokenLifetimeDays) // ��������� ����� ��������
    //    };

    //    Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);


    //    return Ok($"Access Token: {accessToken}");

    //}




    //[HttpPost("/reg")] // �����������
    //public async Task<IActionResult> signUp([FromForm] UserRegistrationRequest user)
    //{

    //    if (!ModelState.IsValid)
    //    {
    //        return BadRequest(ModelState);
    //    }


    //    bool emailExists = await _context.Users.AnyAsync(u => u.email == user.email);

    //    if (emailExists)
    //    {
    //        return BadRequest("Email ��� ������������");
    //    }




    //    bool userExists = await _context.Users
    //   .AnyAsync(u => u.name == user.name && u.email == user.email);

    //    if (userExists)
    //    {
    //        return BadRequest();
    //    }

    //    var abc = new User
    //    {
    //        name = user.name,
    //        email = user.email,
    //        password = user.password,
    //        accountRegistrationDate = DateTime.UtcNow.Date,
    //        role = "user"
    //    };

    //    // ��������� Access ������
    //    var accessToken = _tokenService.GenerateAccessToken(abc);

    //    // ��������� Refresh ������
    //    var refreshToken = _tokenService.GenerateRefreshToken(abc);


 


    //    var newUser = new User
    //    {
    //        name = user.name,
    //        email = user.email,
    //        password = BCrypt.Net.BCrypt.HashPassword(user.password),
    //        accountRegistrationDate = DateTime.UtcNow.Date,
    //        role = "user"
    //    };


    //    // ��������� Refresh ������ � HttpOnly ����
    //    var cookieOptions = new CookieOptions
    //    {
    //        HttpOnly = true,
    //        Secure = true, // ���������, ��� ������������ HTTPS
    //        SameSite = SameSiteMode.None, // ���� ���������� ��� �����-�������� ��������
    //        Expires = DateTime.UtcNow.AddDays(TokenService.AuthOptions.RefreshTokenLifetimeDays) // ��������� ����� ��������
    //    };

    //    Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);


    //    _context.Users.Add(newUser);
    //    await _context.SaveChangesAsync();







    //    return Json($"Access token:{accessToken}"); // ���������� JSON-����� � ��������
    //}

    

    //[HttpPost("product/new")]
    //public async Task<IActionResult> ProductCreation([FromBody] ProductRequest request)
    //{
    //    // ���������, ���������� �� ��������� � ���� ������
    //    var existingCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Name == request.Category);

    //    // ���� ��������� �� �������, ���������� ������
    //    if (existingCategory == null)
    //    {
    //        return BadRequest($"��������� '{request.Category}' �� ����������. ����������, �������� ��������� ���������.");
    //    }

    //    // ��������� �����
    //    string pictureUrl = null;
    //    if (request.RawFile != null) // �������� ���� ��������
    //    {
    //        pictureUrl = await _storageService.loadFileAsync("data", request.RawFile);
    //    }

    //    // ������� ����� ������� � ��������� ��� � ������������ ����������
    //    var newProduct = new Product
    //    {
    //        Title = new LocalizedTitle { Ru = request.RuTitle, Uk = request.UkrTitle },
    //        PictureUrl = pictureUrl,
    //        Description = new LocalizedDescription { Ru = request.RuDescription, Uk = request.UkrDescription },
    //        Category = existingCategory,
    //        Price = request.Price,
    //        Seller = "Shopilyze",
    //        Grade = 3,
    //        SeoURL = request.SeoURL,
    //        ProductCode = request.ProductCode
    //    };

    //    _context.Products.Add(newProduct);
    //    await _context.SaveChangesAsync();

    //    return Ok(newProduct);
    //}









    //[HttpPost("product/new")]
    //public async Task<IActionResult> ProductCreation([FromBody] ProductRequest request)
    //{
    //    // ���������, ���������� �� ��������� � ���� ������
    //    var existingCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Name == request.Category);

    //    if (existingCategory == null)
    //    {
    //        return BadRequest($"��������� '{request.Category}' �� ����������. ����������, �������� ��������� ���������.");
    //    }

    //    // ���������, ��� ������ �� ����� �� �����
    //    string pictureUrl = null;
    //    if (!string.IsNullOrEmpty(request.Pictures?.Src) && !string.IsNullOrEmpty(request.Pictures.RawFile.FileName))
    //    {
    //        try
    //        {
    //            // �������� ���� � ��� �����
    //            Console.WriteLine($"Path: {request.Pictures.RawFile.Path}, FileName: {request.Pictures.RawFile.FileName}");

    //            // ��������� ����
    //            pictureUrl = await _storageService.loadFileAsync("data", request.Pictures.Src, request.Pictures.RawFile.FileName);

    //            // �������� ��������� ��������
    //            Console.WriteLine($"Picture URL: {pictureUrl}");
    //        }
    //        catch (Exception ex)
    //        {
    //            // �������� ��������� ������
    //            Console.WriteLine($"������ ��� �������� �����: {ex.Message}");
    //            return StatusCode(500, "������ ��� �������� �����.");
    //        }
    //    }

    //    // ������� ����� �������
    //    var newProduct = new Product
    //    {
    //        Title = new LocalizedTitle { Ru = request.RuTitle, Uk = request.UkrTitle },
    //        PictureUrl = pictureUrl,  // ������������� URL ����������� ����������
    //        Description = new LocalizedDescription { Ru = request.RuDescription, Uk = request.UkrDescription },
    //        Category = existingCategory,
    //        Price = request.Price,
    //        Seller = "Shopilyze",
    //        Grade = 3,
    //        SeoURL = request.SeoURL,
    //        ProductCode = request.ProductCode
    //    };

    //    _context.Products.Add(newProduct);
    //    await _context.SaveChangesAsync();

    //    return Ok(newProduct);
    //}




    //[HttpPost("product/new")]
    //public async Task<IActionResult> ProductCreation([FromForm] ProductRequest request)
    //{


    //    var existingCategory = await _context.Categories.FirstOrDefaultAsync(c => c.name == request.category);
    //    if (existingCategory == null)
    //    {
    //        return BadRequest($"��������� '{request.category}' �� ����������. ����������, �������� ��������� ���������.");
    //    }

    //    string pictureUrl = null;
    //    if (request.picture != null && request.picture.Length > 0)
    //    {
    //        var filePath = Path.Combine(Path.GetTempPath(), request.picture.FileName);
    //        using (var stream = new FileStream(filePath, FileMode.Create))
    //        {
    //            await request.picture.CopyToAsync(stream);
    //        }

    //        try
    //        {
    //            pictureUrl = await _storageService.LoadFileAsync("data", filePath, request.picture.FileName);
    //        }
    //        catch (Exception ex)
    //        {
    //            return StatusCode(500, $"������ ��� �������� �����: {ex.Message}");
    //        }
    //    }

    //    var newProduct = new Product
    //    {
    //        title = new LocalizedTitle { ru = request.ruTitle, uk = request.ukrTitle },
    //        pictureUrl = pictureUrl,
    //        description = new LocalizedDescription { ru = request.ruDescription, uk = request.ukrDescription },
    //        category = existingCategory,
    //        price = request.price,
    //        seller = "Shopilyze",
    //        grade = 3,
    //        seoURL = request.seoURL,
    //        productCode = request.productCode
    //    };



    //    _context.Products.Add(newProduct);
    //    await _context.SaveChangesAsync();
    //    return Ok(newProduct);
    //}














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

        return Ok(groupedProducts); // ���������� JSON � �������
    }










    //[HttpGet("product")]
    //public async Task<IActionResult> Product(
    //string search = "",
    //string _sort = "",
    //string _order = "asc",
    //string category = "",
    //int _start = 0,
    //int _end = 100)
    //{
    //    var allProductsQuery = _context.Products.AsQueryable();



    //    var allProducts = await allProductsQuery.ToListAsync();
    //    // ���������� �� ���������� ������� �� ������� ����������
    //    if (!string.IsNullOrEmpty(search))
    //    {
    //        allProducts = allProducts
    //            .Where(p => p.title != null &&
    //                        (p.title.uk.Contains(search, StringComparison.OrdinalIgnoreCase) ||
    //                         p.title.ru.Contains(search, StringComparison.OrdinalIgnoreCase)))
    //            .ToList();
    //    }

    //    // ���������� �� �������������
    //    if (!string.IsNullOrEmpty(category))
    //    {
    //        allProductsQuery = allProductsQuery
    //            .Include(p => p.category)
    //            .Where(p => p.category.name == category);
    //    }

    //    // ������������� ����������, ���� ������ ��������� _sort � _order
    //    if (!string.IsNullOrEmpty(_sort) && !string.IsNullOrEmpty(_order))
    //    {
    //        // ����������� �������� _sort � ���������� �������� �������� ������ Product
    //        var property = typeof(Product).GetProperty(_sort,
    //            System.Reflection.BindingFlags.IgnoreCase |
    //            System.Reflection.BindingFlags.Public |
    //            System.Reflection.BindingFlags.Instance);

    //        if (property != null)
    //        {
    //            // ���������� ����������� ���������� (�� ����������� ��� ��������)
    //            bool isDescending = _order.Equals("desc", StringComparison.OrdinalIgnoreCase);


    //            allProductsQuery = isDescending
    //                ? allProductsQuery
    //                                  .Include(p => p.category)
    //                                  .OrderByDescending(p => EF.Property<object>(p, property.Name))
    //                : allProductsQuery.Include(p => p.category).OrderBy(p => EF.Property<object>(p, property.Name));
    //        }
    //        else
    //        {
    //            return BadRequest($"���������� �� ���� '{_sort}' ����������.");
    //        }
    //    }

    //    // ���������� ���������
    //    allProductsQuery = allProductsQuery.Skip(_start).Take(_end - _start);

    //    // ��������� ������ ��������� ����� ���������� ��������, ���������� � ���������
    //    allProducts = await allProductsQuery.Include(p => p.category).ToListAsync();

    //    var totalProductsCount = allProducts.Count();


    //    // ���������� ��������� � ����� ����������� ���������
    //    Response.Headers.Add("X-Total-Count", totalProductsCount.ToString());

    //    return Ok(allProducts);
    //}

    //[HttpGet("category")]
    //public async Task<IActionResult> Category()
    //{
    //    var allCategory = await _context.Categories.ToListAsync();


    //    var totalProductsCount = allCategory.Count();

    //    Response.Headers.Add("X-Total-Count", totalProductsCount.ToString());

    //    return Ok(allCategory);
    //}

    //[HttpPost("category/new")]
    //public async Task<IActionResult> NewCategory([FromForm] string newCategory)
    //{

    //    if(newCategory == null)
    //    {
    //        return BadRequest("������� ����� �������� ���������");
    //    }


    //    var category = await _context.Categories.FirstOrDefaultAsync(c => c.name == newCategory);
    //    if (category != null)
    //    {
    //        return BadRequest("����� ��������� ��� ����������");
    //    }




    //    var CategoryNew = new Category
    //    {
    //        name = newCategory,
    //    };

    //    _context.Categories.Add(CategoryNew);
    //    await _context.SaveChangesAsync();
    //    return Ok(CategoryNew);
    //}


    //[HttpDelete("category/delete")]
    //public async Task<IActionResult> deleteCategory([FromForm] string category)
    //{
    //    if (category == null)
    //    {
    //        return BadRequest("������� ����� �������� ���������");
    //    }

    //    var categoryD = await _context.Categories.FirstOrDefaultAsync(c => c.name == category);
    //    if (categoryD == null)
    //    {
    //        return BadRequest("����� ��������� �� ����������");
    //    }

    //    _context.Categories.Remove(categoryD);
    //    await _context.SaveChangesAsync();
    //    return Ok();
    //}






    //[HttpGet("product/{id}")]
    //public async Task<IActionResult> Product(int id)
    //{
    //    // ���������� Include ��� �������� ��������� ������ ���������
    //    var product = await _context.Products
    //        .Include(p => p.category) // �������� ���������� ������� Category
    //        .FirstOrDefaultAsync(p => p.id == id);

    //    if (product == null)
    //    {
    //        return NotFound();
    //    }

    //    Console.WriteLine($"{product.category?.name}"); // ������� ��� ���������

    //    return Ok(product);
    //}





    //[HttpGet("refresh")]
    //public IActionResult Refresh()
    //{
    //    // ��������� Refresh ������ �� ����
    //    if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
    //    {
    //        return Unauthorized("No refresh token provided");
    //    }

    //    // �������� Refresh ������
    //    var principal = _tokenService.GetPrincipalFromExpiredToken(refreshToken);
    //    if (principal == null)
    //    {
    //        return Unauthorized("Invalid refresh token");
    //    }

    //    // ��������� �������������� ������������ �� ������
    //    var userEmail = principal.Claims.FirstOrDefault(c => c.Type == "Email")?.Value;
    //    var user = GetUserByEmail(userEmail); // ���������� ���� ����� ��� ��������� ������������ �� ���� ������
    //    if (user == null)
    //    {
    //        return Unauthorized("User not found");
    //    }

    //    // ��������� ������ Access ������
    //    var newAccessToken = _tokenService.GenerateAccessToken(user);

    //    return Ok(new { AccessToken = newAccessToken });
    //}

    //// ����� ��� ��������� ������������ �� Email
    //private User GetUserByEmail(string email)
    //{
    //    // ���������� ������ ��������� ������������ �� ���� ������ �� Email
    //    return _context.Users.FirstOrDefault(u => u.email == email);
    //}



    // Patch ���� �����
    //[HttpPatch("product/edit")]
    //public async Task<IActionResult> UploadProduct(/*int id, string title = "", string description = "", string category = "", int price = -1*/ Product product)
    //{

    //    if (product == null)
    //    {
    //        return BadRequest();
    //    }


    //    _context.Products.Update(product);

    //    await _context.SaveChangesAsync();

    //    return Ok();
    //}

    //[HttpDelete("product/delete/{id}")]
    //public async Task<IActionResult> DeleteProduct(int id)
    //{
    //    var product = await _context.Products.FirstOrDefaultAsync(p => p.id == id);

    //    if (product == null)
    //    {
    //        return NotFound($"����� � id {id} �� ������.");
    //    }

    //    _context.Products.Remove(product);

    //    await _context.SaveChangesAsync();

    //    return Ok();
    //}


    [HttpGet("/auth")]
    [Authorize(Roles ="admin")]
    public IActionResult autorizeHi()
    {
        return Ok("Hi");
    }

}
