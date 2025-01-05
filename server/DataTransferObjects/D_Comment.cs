using System.ComponentModel.DataAnnotations;

namespace server.DataTransferObjects;

public class D_Comment
{
    [Required]
    public string? Content { get; set; }
    
    [Required]
    public int ProductId { get; set; }
    
    [Required]
    public string? Pluses { get; set; }
    
    [Required]
    public string Minuses { get; set; }
    
    [Required]
    public int Grade { get; set; }
}