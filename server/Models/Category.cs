using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Category
    {
        public int id { get; set; }
        [Required]
        public string? name { get; set; }
        
        public virtual ICollection<SubCategory> subCategories { get; set; } = new List<SubCategory>();

    }
}
