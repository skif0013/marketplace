using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using server.DataTransferObjects;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class productController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly SupabaseStorageService _storageService;
        private readonly TokenService _tokenService;

        public productController(AppDbContext context, SupabaseStorageService storageService, TokenService tokenService)
        {
            _context = context;
            _storageService = storageService;
            _tokenService = tokenService;
        }





        /// <summary>
        /// Получает список всех продуктов с возможностью фильтрации, сортировки и пагинации.
        /// </summary>
        /// <param name="search">Поисковый запрос для фильтрации по названию продукта.</param>
        /// <param name="_sort">Поле, по которому будет произведена сортировка.</param>
        /// <param name="_order">Направление сортировки: "asc" или "desc".</param>
        /// <param name="category">Категория для фильтрации продуктов.</param>
        /// <param name="_start">Начальный индекс для пагинации.</param>
        /// <param name="_end">Конечный индекс для пагинации.</param>
        /// <returns>Список продуктов с учетом заданных фильтров.</returns>
        /// <response code="200">Возвращает список продуктов.</response>
        /// <response code="400">Ошибка в переданных параметрах.</response>
        [HttpGet("")]
        public async Task<IActionResult> Product(
        string search = "",
        string _sort = "",
        string _order = "asc",
        string category = "",
        string seller = "",
        int page = 1,
        int pageSize = 3)
        {
            var allProductsQuery = _context.Products
                .Include(p => p.Comments)
                .Include(p => p.category) // Assuming 'Category' is a navigation property
                .AsQueryable();
            
            
            // Фильтрация по категории
            if (!string.IsNullOrEmpty(category))
            {
                if (_context.SubCategories.FirstOrDefaultAsync(s => s.nameCategory == category).Result != null)
                {
                    allProductsQuery = allProductsQuery.Where(p => p.category.nameCategory == category);
                }
                else
                {
                    return BadRequest($"Категория {category} не существует");
                }
                
            }

            if (!string.IsNullOrEmpty(seller))
            {
                if (_context.Products.FirstOrDefaultAsync(p => p.seller == seller).Result != null)
                {
                    allProductsQuery = allProductsQuery.Where(p => p.seller == seller);
                }
                else
                {
                    return BadRequest($"Продавца {seller} не существует");
                }
            }

            // Универсальная сортировка, если заданы параметры _sort и _order
            if (!string.IsNullOrEmpty(_sort) && !string.IsNullOrEmpty(_order))
            {
                var property = typeof(Product).GetProperty(_sort,
                    System.Reflection.BindingFlags.IgnoreCase |
                    System.Reflection.BindingFlags.Public |
                    System.Reflection.BindingFlags.Instance);

                if (property != null)
                {
                    bool isDescending = _order.Equals("desc", StringComparison.OrdinalIgnoreCase);
                    allProductsQuery = isDescending
                        ? allProductsQuery.OrderByDescending(p => EF.Property<object>(p, property.Name))
                        : allProductsQuery.OrderBy(p => EF.Property<object>(p, property.Name));
                }
                else
                {
                    return BadRequest($"Сортировка по полю '{_sort}' невозможна.");
                }
            }
            else
            {
                // По умолчанию сортируем по id, если сортировка не указана
                allProductsQuery = _order.Equals("desc", StringComparison.OrdinalIgnoreCase)
                    ? allProductsQuery.OrderByDescending(p => p.id)
                    : allProductsQuery.OrderBy(p => p.id);
            }

            

            allProductsQuery = allProductsQuery.Skip((page - 1) * pageSize).Take(pageSize);

            
            // Проекция в нужный формат JSON
            var allProducts = await allProductsQuery
                .Select(p => new
                {
                    id = p.id,
                    title = new { uk = p.title.uk, ru = p.title.ru },
                    pictureUrl = p.pictureUrl,
                    description = new { uk = p.description.uk, ru = p.description.ru },
                    category = p.category.nameCategory,
                    parentCategory = p.category.Category.name,
                    price = p.price,
                    seller = p.seller,
                    grade = p.grade,
                    seoURL = p.seoURL,
                    productCode = p.productCode,
                    comments = p.Comments.Select(c => new
                    {
                        id = c.Id,
                        author = c.Author,
                        content = c.Content,
                        createdAt = c.CreatedAt,
                        productId = c.ProductId,
                        pluses = c.Pluses,
                        minuses = c.Minuses,
                        grade = c.Grade
                    }).ToList()
                })
                .ToListAsync();

            if (allProducts.Count <= 0)
            {
                return NotFound();
            }
            
            // Добавление заголовка с общим количеством продуктов
            Response.Headers.Add("X-Total-Count", allProducts.Count.ToString());

            return Ok(allProducts);
        }




        [HttpPost("new")]
        public async Task<IActionResult> ProductCreation([FromForm] ProductRequest request)
        {


            var existingCategory = await _context.SubCategories.FirstOrDefaultAsync(s => s.nameCategory == request.category);
            if (existingCategory == null)
            {
                return BadRequest($"Категория '{request.category}' не существует. Пожалуйста, выберите доступную категорию.");
            }

            string pictureUrl = null;
            if (request.picture != null && request.picture.Length > 0)
            {
                var filePath = Path.Combine(Path.GetTempPath(), request.picture.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.picture.CopyToAsync(stream);
                }

                try
                {
                    pictureUrl = await _storageService.LoadFileAsync("data", filePath, request.picture.FileName);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Ошибка при загрузке файла: {ex.Message}");
                }
            }
            
            
            var authorizationHeader = Request.Headers["Authorization"].FirstOrDefault();
            string jwtToken;
            if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
            {
                jwtToken = authorizationHeader.Substring("Bearer ".Length);
            }
            else
            {
                if (Request.Cookies.TryGetValue("refreshToken", out jwtToken))
                {
                    Console.WriteLine($"refreshToken взят из куки");
                }
                else
                {
                    return Unauthorized("отправьте токен в Authorization заголовке");
                }
            }
            
            var principal = _tokenService.GetPrincipalFromExpiredToken(jwtToken);
            string userName = principal.Claims.FirstOrDefault(c => c.Type == "Name")?.Value;

            Console.WriteLine($"userName: {userName}");
            
            var newProduct = new Product
            {
                title = new LocalizedTitle { ru = request.ruTitle, uk = request.ukrTitle },
                pictureUrl = pictureUrl,
                description = new LocalizedDescription { ru = request.ruDescription, uk = request.ukrDescription },
                category = existingCategory,
                price = request.price,
                seller = userName,
                seoURL = request.seoURL,
                productCode = request.productCode
                
            };



            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();
            return Ok(newProduct);
        }
        
        
        
        
    [HttpPost("add")]
    public async Task<IActionResult> AddComment([FromForm] D_Comment Comment)
    {
        
        // Получение заголовка Authorization
        var authorizationHeader = Request.Headers["Authorization"].FirstOrDefault();
        Console.WriteLine($"Authorization Header: {authorizationHeader}");

        string jwtToken = null;

        if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
        {
            jwtToken = authorizationHeader.Substring("Bearer ".Length);
        }
        else
        {
            // Попытка получить токен из куки
            if (Request.Cookies.TryGetValue("refreshToken", out jwtToken))
            {
                Console.WriteLine($"Token from Cookie");
            }
            else
            {
                return Unauthorized("Токен отсутствует в заголовке или куках.");
            }
        }

        // Проверка наличия токена
        if (string.IsNullOrEmpty(jwtToken))
        {
            return Unauthorized("Токен отсутствует в заголовке или куках.");
        }

        // Получение данных из токена
        var principal = _tokenService.GetPrincipalFromExpiredToken(jwtToken);
        if (principal == null)
        {
            return Unauthorized("Невалидный токен.");
        }

        // Извлечение имени пользователя
        var userName = principal.Claims.FirstOrDefault(c => c.Type == "Name")?.Value;
        if (string.IsNullOrEmpty(userName))
        {
            return Unauthorized("Имя пользователя не найдено в токене.");
        }

        
        
        // Найдём продукт по Id
        var product = await _context.Products.Include(p => p.Comments).FirstOrDefaultAsync(p => p.id == Comment.ProductId);
        
        if (product == null)
        {
            return NotFound($"Продукт с Id {Comment.ProductId} не найден.");
        }

        // Создадим новый комментарий
        var comment = new Comment
        {
            Author = userName,
            Content = Comment.Content,
            ProductId = Comment.ProductId,
            Pluses = Comment.Pluses,
            Minuses = Comment.Minuses,
            Grade = Comment.Grade,
        };

        // Сохраним комментарий
        _context.Comments.Add(comment);
       

        Console.WriteLine($" количество коментов: {product.Comments.Count}");
        Console.WriteLine($"productId: {product.grade}\nsellr: {product.seller}");
        Console.WriteLine($"коменты: {product.Comments.Average(c => c.Grade)}");
        
        product.grade = product.Comments.Average(c => c.Grade);
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
        return Ok(comment);
    }

        
        
        
        /*[HttpPost("add")]
        public async Task<IActionResult> AddComment([FromForm] D_Comment Comment)
        {
            // Найдем продукт по Id
            var product = await _context.Products.Include(p => p.Comments).FirstOrDefaultAsync(p => p.id == Comment.ProductId);
            if (product == null)
            {
                return NotFound($"Продукт с Id {Comment.ProductId} не найден.");
            }
            
            var authorizationHeader = Request.Headers["Authorization"].FirstOrDefault();
            
            Console.WriteLine($"TOKEN {authorizationHeader}");
            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return Unauthorized("Токен отсутствует или имеет неверный формат.");
            }

            var jwtToken = authorizationHeader.Substring("Bearer ".Length);

            // Получение данных из токена
            var principal = _tokenService.GetPrincipalFromExpiredToken(jwtToken);
            var userName = principal.Identity.Name;
            

            
            // Создадим новый комментарий
            var comment = new Comment
            {
                Author = userName,  // Или другой способ получить имя пользователя
                Content = Comment.Content,
                ProductId = Comment.ProductId,
                Pluses = Comment.Pluses,
                Minuses = Comment.Minuses,
            };

            // Добавим комментарий к продукту
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }*/





        [HttpPatch("edit")]
        public async Task<IActionResult> UploadProduct(/*int id, string title = "", string description = "", string category = "", int price = -1*/ Product product)
        {

            if (product == null)
            {
                return BadRequest();
            }


            _context.Products.Update(product);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.id == id);

            if (product == null)
            {
                return NotFound($"Товар с id {id} не найден.");
            }

            _context.Products.Remove(product);

            await _context.SaveChangesAsync();

            return Ok();
        }



        [HttpGet("{id}")] // сделать по айди, по сеоЮРЛ и по коду товара
        public async Task<IActionResult> Product(int id)
        {
            // Используем Include для загрузки связанных данных категории
            var product = await _context.Products
                .Include(p => p.Comments)
                .Include(p => p.category) // Загрузка связанного объекта Category
                .Where(p => p.id == id)
                .Select(p => new 
                {
                    id = p.id,
                    title = new { uk = p.title.uk, ru = p.title.ru },
                    pictureUrl = p.pictureUrl,
                    description = new { uk = p.description.uk, ru = p.description.ru },
                    category = p.category.nameCategory,
                    parentCategory = p.category.Category.name,
                    price = p.price,
                    seller = p.seller,
                    grade = p.grade,
                    seoURL = p.seoURL,
                    productCode = p.productCode,
                    Coments = p.Comments.Select(c => new
                    {
                        id = c.Id,
                        author = c.Author,
                        content = c.Content,
                        createdAt = c.CreatedAt,
                        productId = c.ProductId,
                        pluses = c.Pluses,
                        minuses = c.Minuses,
                        grade = c.Grade
                    }).ToList()

                }).FirstOrDefaultAsync();
            if (product == null)
            {
                return NotFound();
            }

            Console.WriteLine($"{product.category}"); // Выводим имя категории
            
            
            
            return Ok(product);
        }






        [HttpGet("category")]
        public async Task<IActionResult> Category()
        {
            var allCategory = await _context.Categories.Include(c => c.subCategories).ToListAsync();


            var totalProductsCount = allCategory.Count();

            Response.Headers.Add("X-Total-Count", totalProductsCount.ToString());

            return Ok(allCategory);
        }



        [HttpPost("category/new")]
        public async Task<IActionResult> NewCategory([FromForm] CategoryRequest category)
        {

            if (category == null)
            {
                return BadRequest("Введите новое название категории");
            }


            var NewCategory = await _context.Categories.FirstOrDefaultAsync(c => c.name == category.Name);
            if (NewCategory != null)
            {
                return BadRequest("Такая категория уже существует");
            }




            var CategoryNew = new Category
            {
                name = category.Name,
            };

            _context.Categories.Add(CategoryNew);
            await _context.SaveChangesAsync();
            return Ok(CategoryNew);
        }
        


        [HttpDelete("category/delete")]
        public async Task<IActionResult> deleteCategory([FromBody] string category)
        {
            if (category == null)
            {
                return BadRequest("Введите новое название категории");
            }

            var categoryD = await _context.Categories.FirstOrDefaultAsync(c => c.name == category);
            if (categoryD == null)
            {
                return BadRequest("Такой категории не существует");
            }

            _context.Categories.Remove(categoryD);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("category/addSubCategory")]
        public async Task<IActionResult> CreateSubCategory([FromForm] SubCategoryRequest subCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var NewSubCategory = await _context.SubCategories.FirstOrDefaultAsync(s => s.nameCategory == subCategory.SubCategoryName);
            if (NewSubCategory != null)
            {
                return BadRequest("такая категория уже существует");
            }

            var New = new SubCategory
            {
                nameCategory = subCategory.SubCategoryName,
                CategoryId = subCategory.ParentCategoryId
            };

            _context.SubCategories.Add(New);
            await _context.SaveChangesAsync();
            
            return Ok(New);
        }
    }
}
