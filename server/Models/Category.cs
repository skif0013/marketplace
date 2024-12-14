using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class Category
    {
        public int id { get; set; }

        public string? name { get; set; }

        [JsonIgnore]
        public List<Product> products { get; set; } = new();



        public int? ParentCategoryId {  get; set; } // родительский каталог


        public virtual Category? ParentCategory { get; set; } // навигационное своейсто

        public virtual ICollection<Category> SubCategory { get; set; } = new List<Category>(); // подкатегория

        [NotMapped]
        public ICollection<Product> Products { get; set; } = new List<Product>();



       
        
    }
}
