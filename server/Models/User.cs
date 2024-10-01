

using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace server.Models
{
    public class User
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; } 

        public string? Password { get; set; }

        public DateTime AccountRegistrationDate { get; set; }


        public int? RefreshTokenId { get; set; }

        public RefreshToken? RefreshToken { get; set; }
    }
}
