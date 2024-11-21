using Microsoft.EntityFrameworkCore;
using System.Reflection;

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

            // Удалите вызовы HasNoKey(), так как они не нужны
            // modelBuilder.Entity<LocalizedTitile>().HasNoKey();
            // modelBuilder.Entity<LocalizedDescription>().HasNoKey();

            // Настройка модели Product для работы с комплексными типами как owned types
            modelBuilder.Entity<Product>(entity =>
            {
                entity.OwnsOne(p => p.title); // Настраиваем Titile как owned type (если опечатка, исправьте на Title)
                entity.OwnsOne(p => p.description);

            });


            modelBuilder.Entity<Product>()
            .HasMany(p => p.Comments)
            .WithOne(c => c.Product)
            .HasForeignKey(c => c.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
        }



        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        //}
    }
}
