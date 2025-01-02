using System.ComponentModel.DataAnnotations;

namespace server.DataTransferObjects;

public class SubCategoryRequest
{
    [Required]
    public int ParentCategoryId { get; set; }
    [Required]
    public string SubCategoryName { get; set; }
}