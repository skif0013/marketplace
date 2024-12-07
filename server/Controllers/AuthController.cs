﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class authController : Controller
    {

        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;
        private readonly PasswordService _passwordService;


        public authController( AppDbContext context,TokenService tokenService, PasswordService passwordService)
        {
            _context = context;
            _tokenService = tokenService;
            _passwordService = passwordService;
        }



        [HttpPost("singIn")]  // вход
        public async Task<IActionResult> SingIn([FromBody] EUser user)
        {

            if (user == null)
            {
                return BadRequest("введите все данные");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Euser = await _context.Users.FirstOrDefaultAsync(u => u.email == user.email && u.name == user.name);

            if (Euser == null)
            {
                return BadRequest("Такого юзера не существует");
            }

            var result = BCrypt.Net.BCrypt.Verify(user.password, Euser.password);



            if (!result)
            {
                return BadRequest("Неверный пароль");
            }


            var accessToken = _tokenService.GenerateAccessToken(Euser);

            var refreshToken = _tokenService.GenerateRefreshToken(Euser);

            // Установка Refresh токена в HttpOnly куку
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Убедитесь, что используется HTTPS
                SameSite = SameSiteMode.None, // Если необходимо для кросс-доменных запросов
                Expires = DateTime.UtcNow.AddDays(TokenService.AuthOptions.RefreshTokenLifetimeDays) // Установка срока действия
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);


            return Ok($"Access Token: {accessToken}");

        }


        [HttpPost("reg")] // регистрация
        public async Task<IActionResult> signUp([FromBody] UserRegistrationRequest user)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            bool emailExists = await _context.Users.AnyAsync(u => u.email == user.email);

            if (emailExists)
            {
                return BadRequest("Email уже используется");
            }




            bool userExists = await _context.Users
           .AnyAsync(u => u.name == user.name && u.email == user.email);

            if (userExists)
            {
                return BadRequest();
            }

            var abc = new User
            {
                name = user.name,
                email = user.email,
                password = user.password,
                accountRegistrationDate = DateTime.UtcNow.Date,
                role = "user"
            };

            // Генерация Access токена
            var accessToken = _tokenService.GenerateAccessToken(abc);

            // Генерация Refresh токена
            var refreshToken = _tokenService.GenerateRefreshToken(abc);





            var newUser = new User
            {
                name = user.name,
                email = user.email,
                password = BCrypt.Net.BCrypt.HashPassword(user.password),
                accountRegistrationDate = DateTime.UtcNow.Date,
                role = "user"
            };


            // Установка Refresh токена в HttpOnly куку
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Убедитесь, что используется HTTPS
                SameSite = SameSiteMode.None, // Если необходимо для кросс-доменных запросов
                Expires = DateTime.UtcNow.AddDays(TokenService.AuthOptions.RefreshTokenLifetimeDays) // Установка срока действия
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);


            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();







            return Json(new { accessToken = accessToken });
        }


        [HttpGet("refresh")]
        public IActionResult Refresh()
        {
            // Получение Refresh токена из куки
            if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
            {
                return Unauthorized("No refresh token provided");
            }

            // Проверка Refresh токена
            var principal = _tokenService.GetPrincipalFromExpiredToken(refreshToken);
            if (principal == null)
            {
                return Unauthorized("Invalid refresh token");
            }

            // Получение идентификатора пользователя из токена
            var userEmail = principal.Claims.FirstOrDefault(c => c.Type == "Email")?.Value;
            var user = GetUserByEmail(userEmail); // Реализуйте этот метод для получения пользователя из базы данных
            if (user == null)
            {
                return Unauthorized("User not found");
            }

            // Генерация нового Access токена
            var newAccessToken = _tokenService.GenerateAccessToken(user);

            return Ok(new { AccessToken = newAccessToken });
        }

        private User GetUserByEmail(string email)
        {
            // Реализуйте логику получения пользователя из базы данных по Email
            return _context.Users.FirstOrDefault(u => u.email == email);
        }

    }
}
