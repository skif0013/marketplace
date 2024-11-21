using System.Text.Json.Serialization;

namespace server.Models
{
    public class Category
    {
        public int id { get; set; }

        public string? name { get; set; }

        [JsonIgnore]
        public List<Product> products { get; set; } = new();
    }
}
