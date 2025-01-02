using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Category
    {
        public int id { get; set; }
        [Required]
        public string? name { get; set; }
        
        public List<string> SubCategory { get; set; } = new List<string>();

    }
}
