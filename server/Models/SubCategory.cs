using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace server.Models;

public class SubCategory
{
    public int id { get; set; }
    [Required]
    public string nameCategory { get; set; }
    [Required]
    public int CategoryId { get; set; }
    
    [JsonIgnore]
    // Навигационное свойство на Product
    public virtual Category? Category { get; set; }
}