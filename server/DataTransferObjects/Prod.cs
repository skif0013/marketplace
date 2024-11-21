//public class ProductRequest
//{
//    public string? RuDescription { get; set; }
//    public string? UkrDescription { get; set; }
//    public string? RuTitle { get; set; }
//    public string? UkrTitle { get; set; }
//    public string? Category { get; set; }
//    public string? ProductCode { get; set; }
//    public int Price { get; set; }
//    public string? SeoURL { get; set; }
//    public PictureData Pictures { get; set; }
//}

//public class PictureData
//{
//    public RawFileData RawFile { get; set; }
//    public string? Src { get; set; }
//    public string? Title { get; set; }
//}

//public class RawFileData
//{
//    public string? Path { get; set; }
//}




//public class ProductRequest
//{
//    public string? RuDescription { get; set; }
//    public string? UkrDescription { get; set; }
//    public string? RuTitle { get; set; }
//    public string? UkrTitle { get; set; }
//    public string? Category { get; set; }
//    public string? ProductCode { get; set; }
//    public int Price { get; set; }
//    public string? SeoURL { get; set; }
//    public PictureData? Pictures { get; set; }  // Поле для изображения
//}

//public class PictureData
//{
//    public RawFileData? RawFile { get; set; }  // Файл
//    public string? Path { get; set; }          // Поле path из JSON
//    public string? Src { get; set; }           // Поле src из JSON
//    public string? Title { get; set; }         // Поле title из JSON
//}

//public class RawFileData
//{
//    public string? Path { get; set; }          // Поле path из JSON для rawFile
//    public string? FileName { get; set; }      // Новое поле, если нужно имя файла
//}



using System.ComponentModel.DataAnnotations;

public class ProductRequest
{
    [Required]
    public string? ruDescription { get; set; }
    [Required]
    public string? ukrDescription { get; set; }
    [Required]
    public string? ruTitle { get; set; }
    [Required]
    public string? ukrTitle { get; set; }
    [Required]
    public string? category { get; set; }
    [Required]
    public string? productCode { get; set; }
    [Required]
    public int price { get; set; }
    [Required]
    public string? seoURL { get; set; }
    [Required]
    public IFormFile? picture { get; set; }  // Поле для файла изображения 
}


