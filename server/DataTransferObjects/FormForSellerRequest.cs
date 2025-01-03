using System.ComponentModel.DataAnnotations;

namespace server.DataTransferObjects;

public class FormForSellerRequest
{
    [Required]
    public string CompanyName { get; set; }
    public string? WebsiteLink { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Position { get; set; }
    [Required]
    public string Email { get; set; }
}