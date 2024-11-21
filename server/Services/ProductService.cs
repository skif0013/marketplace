using server.Models;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace server.Services
{
    public class ProductService
    {
        private readonly HttpClient _httpClient;

        public ProductService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Product>> GetProductsAsync(string search = "", string category = "", int start = 0, int end = 20)
        {
            var response = await _httpClient.GetFromJsonAsync<List<Product>>($"api/product?search={search}&category={category}&_start={start}&_end={end}");

            return response;
        }
    }
}
