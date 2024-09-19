using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class User
    {


        public int Id { get; set; }


        public string? Name { get; set; }


        public string? Email { get; set; }


        public string? Password { get; set; }

    }
}
