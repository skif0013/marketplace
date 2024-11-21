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

    //public async Task<string> loadFileAsync(string bucketName, string filePath, string fileName)
    //{
    //    try
    //    {
    //        using var fileStream = System.IO.File.OpenRead(filePath);
    //        var content = new StreamContent(fileStream);
    //        content.Headers.ContentType = new MediaTypeHeaderValue(GetContentType(fileName));

    //        var requestUri = $"{_apiUrl}/object/{bucketName}/{Uri.EscapeDataString(fileName)}";
    //        var response = await _httpClient.PostAsync(requestUri, content);

    //        if (response.IsSuccessStatusCode)
    //        {
    //            // Возвращаем URL для доступа к загруженному файлу
    //            return $"{_apiUrl}/object/public/{bucketName}/{Uri.EscapeDataString(fileName)}";
    //        }
    //        else
    //        {
    //            // Логирование причины ошибки
    //            var errorMessage = await response.Content.ReadAsStringAsync();
    //            throw new Exception($"Ошибка загрузки файла: {response.ReasonPhrase}. Сообщение: {errorMessage}");
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        // Логирование исключения
    //        throw new Exception($"Ошибка при открытии файла: {ex.Message}");
    //    }
    //}



    public async Task<string> LoadFileAsync(string bucketName, string filePath, string fileName)
    {
        try
        {
            // Получаем текущее время и добавляем его к имени файла
            var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");

            // Извлекаем расширение файла
            var extension = Path.GetExtension(fileName);
            var baseFileName = Path.GetFileNameWithoutExtension(fileName);

            // Генерируем новое имя файла с добавленной меткой времени
            var uniqueFileName = $"{baseFileName}_{timestamp}{extension}";

            using var fileStream = System.IO.File.OpenRead(filePath);
            var content = new StreamContent(fileStream);
            content.Headers.ContentType = new MediaTypeHeaderValue(GetContentType(fileName));

            var requestUri = $"{_apiUrl}/object/{bucketName}/{Uri.EscapeDataString(uniqueFileName)}";
            var response = await _httpClient.PostAsync(requestUri, content);

            if (response.IsSuccessStatusCode)
            {
                // Возвращаем URL для доступа к загруженному файлу
                return $"{_apiUrl}/object/public/{bucketName}/{Uri.EscapeDataString(uniqueFileName)}";
            }
            else
            {
                // Логирование причины ошибки
                var errorMessage = await response.Content.ReadAsStringAsync();
                throw new Exception($"Ошибка загрузки файла: {response.ReasonPhrase}. Сообщение: {errorMessage}");
            }
        }
        catch (Exception ex)
        {
            // Логирование исключения
            throw new Exception($"Ошибка при загрузке файла: {ex.Message}");
        }
    }





    public string GetContentType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        switch (extension)
        {
            case ".jpg":
            case ".jpeg":
                return "image/jpeg";
            case ".png":
                return "image/png";
            case ".gif":
                return "image/gif";
            case ".bmp":
                return "image/bmp";
            case ".tiff":
                return "image/tiff";
            case ".webp":
                return "image/webp"; // добавьте, если требуется
                                     // Добавьте другие типы файлов по необходимости
            default:
                return "application/octet-stream"; // Обработчик по умолчанию
        }
    }




}
