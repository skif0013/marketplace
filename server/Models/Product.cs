namespace server.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? TitlePictureUrl { get; set; }

        public string? Description { get; set; }

        public string? Category { get; set; }

        public int Price { get; set; }

        public string? Seller { get; set; }

        public int Grade { get; set; }
    }
}
