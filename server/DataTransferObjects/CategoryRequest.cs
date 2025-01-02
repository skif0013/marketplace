namespace server.DataTransferObjects;

public class CategoryRequest
{
    public string Name { get; set; } 
    public List<string> SubCategories { get; set; } 
}