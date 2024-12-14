using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;
using server.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using server.Services;
using Microsoft.OpenApi.Models;
using System.Reflection;
using Blazored.LocalStorage;






var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

// Получаем строку подключения
var connectionString = builder.Configuration.GetConnectionString("MyAppCs");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Регистрация сервисов
builder.Services.AddSingleton<TokenService>();
builder.Services.AddSingleton<SupabaseStorageService>();
builder.Services.AddSingleton<PasswordService>();
builder.Services.AddScoped<ProductService>();





builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();



// Настройка HttpClient для ProductService
builder.Services.AddHttpClient<ProductService>(client =>
{
client.BaseAddress = new Uri("https://www.apishka.somee.com/api/");
});

// Настройка аутентификации
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
{
options.TokenValidationParameters = new TokenValidationParameters
{
ValidateIssuer = true,
ValidIssuer = AuthOptions.ISSUER,
ValidateAudience = false,
ValidateLifetime = true,
IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
ValidateIssuerSigningKey = true,
};
});

//  CORS
builder.Services.AddCors(options =>
{
options.AddPolicy("AllowAll",
    policyBuilder => policyBuilder
        .AllowAnyOrigin()    // Разрешить запросы с любого домена
        .AllowAnyHeader()    // Разрешить любые заголовки
        .AllowAnyMethod()    // Разрешить любые HTTP методы
        .WithExposedHeaders("X-Total-Count") // Экспонировать заголовок X-Total-Count
);
});

// Swagger документация
    builder.Services.AddSwaggerGen(options =>
    {
    options.SwaggerDoc("v1", new OpenApiInfo
    {
    Version = "v1",
    Title = "Shopilyze API",
    TermsOfService = new Uri("https://example.com/terms"),
    Contact = new OpenApiContact
    {
    Name = "Example Contact",
    Url = new Uri("https://example.com/contact")
    },
    License = new OpenApiLicense
    {
    Name = "Example License",
    Url = new Uri("https://example.com/license")
    }
    });

    // Поддержка комментариев из XML
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
    });

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
app.UseExceptionHandler("/Home/Error");
app.UseHsts();
}

app.UseCors("AllowAll");



// Swagger
app.UseSwagger();
app.UseSwaggerUI();


app.MapRazorPages();




app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// MVC маршруты
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

// Опции для аутентификации
public class AuthOptions
{
    public const string ISSUER = "shopilyze.com"; // издатель токена
    const string KEY = "mysupersecret_secretsecretsecretkey!123"; // ключ для шифрации
    public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}