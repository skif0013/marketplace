using System.ComponentModel.DataAnnotations;
namespace server.Models;

public class FormForSeller
{
    
    public int id { get; set; }
    
    [Required]
    public string CompanyName { get; set; }
    [Required]
    public string WebsiteLink { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Position { get; set; }
    [Required]
    public string Email { get; set; }
    
    public DateTime CreatedAt { get; set; }
}