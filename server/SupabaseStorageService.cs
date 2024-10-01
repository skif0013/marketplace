using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

public class SupabaseStorageService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiUrl;
    private readonly string _apiKey;

    public SupabaseStorageService()
    {
        _httpClient = new HttpClient();
        _apiUrl = "https://lkgsrwwspsayunwsyixs.supabase.co/storage/v1";
        _apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrZ3Nyd3dzcHNheXVud3N5aXhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjA4MzUyNywiZXhwIjoyMDQxNjU5NTI3fQ.FnVsQn2lafksbP4JASUDmW3fdB6DEBEJUFk-NzQAUec";
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
    }

    public async Task<string> loadFileAsync(string bucketName, string filePath, string fileName)
    {
        using var fileStream = System.IO.File.OpenRead(filePath);
        var content = new StreamContent(fileStream);
        content.Headers.ContentType = new MediaTypeHeaderValue(GetContentType(fileName));

        var requestUri = $"{_apiUrl}/object/{bucketName}/{fileName}";

        var response = await _httpClient.PostAsync(requestUri, content);

        if (response.IsSuccessStatusCode)
        {
            return $"{_apiUrl}/object/{bucketName}/{fileName}";
        }
        else
        {
            throw new Exception($"Ошибка загрузки файла: {response.ReasonPhrase}");
        }
    }

    private string GetContentType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        return extension switch
        {
            ".jpg" => "image/jpeg",
            ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".bmp" => "image/bmp",
            ".svg" => "image/svg+xml",
            ".webp" => "image/webp",
            _ => "application/octet-stream" 
        };
    }
}
