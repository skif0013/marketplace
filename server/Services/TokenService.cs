using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using server.Models;


namespace server.Services
{

    public class TokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Генерация Access токена
        public string GenerateAccessToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim("Name", user.name!),
                new Claim("Email", user.email!),
                new Claim("role", user.role!)
            };

            var key = AuthOptions.GetSymmetricSecurityKey();
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(AuthOptions.AccessTokenLifetimeMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Генерация Refresh токена
        public string GenerateRefreshToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim("scopes", "REFRESH_TOKEN"),
                new Claim("Email", user.email!),
                new Claim("Name", user.name!),
                new Claim(ClaimTypes.Role, user.role!)
            };

            var key = AuthOptions.GetSymmetricSecurityKey();
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var RefreshToken = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(AuthOptions.RefreshTokenLifetimeDays),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(RefreshToken);
        }

        // Валидация токена
        public ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidIssuer = AuthOptions.ISSUER,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                ValidateLifetime = true 
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
                if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                    !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw new SecurityTokenException("Invalid token");

                return principal;
            }
            catch
            {
                return null;
            }
        }

        public class AuthOptions
        {
            public const string ISSUER = "shopilyze.com";
            const string KEY = "mysupersecret_secretsecretsecretkey!123#";
            public const int AccessTokenLifetimeMinutes = 15;
            public const int RefreshTokenLifetimeDays = 7;

            public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }

    }
}
