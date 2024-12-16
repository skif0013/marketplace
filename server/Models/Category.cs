using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class Category
    {
        public int id { get; set; }
        [Required]
        public string? name { get; set; }

        



        


       
        [JsonIgnore]
        public virtual ICollection<Category> SubCategory { get; set; } = new List<Category>(); // подкатегория

        



       
        
    }
}
//git log