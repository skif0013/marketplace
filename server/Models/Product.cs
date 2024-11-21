using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace server.Models
{

    [Index(nameof(seoURL), IsUnique = true)]
    [Index(nameof(productCode), IsUnique = true)]
    public class Product
    {
        public int id { get; set; }
        [Required]
        public LocalizedTitle? title { get; set; }


        [Required]
        public string? pictureUrl { get; set; }
        [Required]
        public LocalizedDescription? description { get; set; }
        [Required]
        public int categoryId { get; set; }
        [Required]
        public virtual Category? category { get; set; }

        [Required]
        public int price { get; set; }
        [Required]
        public string? seller { get; set; }
        [Required]
        public int grade { get; set; }
        [Required]
        public string? seoURL { get; set; }
        [Required]
        public string? productCode { get; set; }

        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
