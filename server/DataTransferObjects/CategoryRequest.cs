using System.ComponentModel.DataAnnotations;


namespace server.DataTransferObjects;
public class CategoryRequest
{
    [Required]
    public string Name { get; set; } 
    
}