

using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace server.Models
{
    public class User
    {
        public int id { get; set; }

        [Required]
        public string? name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Некорректный адрес")]
        
        public string? email { get; set; }

        [Required]
        public string? password { get; set; }

        public DateTime accountRegistrationDate { get; set; }

        public string? role { get; set; }


      
    }
}
