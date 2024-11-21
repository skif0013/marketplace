using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class Comment
    {
        public int Id { get; set; }
        [Required]
        public string? Author { get; set; }

        [Required]
        public string? Content { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public int ProductId { get; set; }

        [JsonIgnore]
        // Навигационное свойство на Product
        public virtual Product? Product { get; set; }
    }
}
