using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Настроим модель Product для работы с комплексными типами как owned types
            modelBuilder.Entity<Product>(entity =>
            {
                entity.OwnsOne(p => p.title); // Настроим Title как owned type
                entity.OwnsOne(p => p.description); // Настроим Description как owned type
            });

            // Связь между Product и Comment
            modelBuilder.Entity<Product>()
                .HasMany(p => p.Comments)
                .WithOne(c => c.Product)
                .HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // Настройка самореференции для подкатегорий
            modelBuilder.Entity<Category>()
                .HasMany(c => c.SubCategory) // Категория имеет подкатегории
                .WithOne() // Подкатегории не имеют ссылки на родителя
                .OnDelete(DeleteBehavior.Restrict); // Запрещаем каскадное удаление
        }
    }
}