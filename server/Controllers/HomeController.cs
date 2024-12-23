using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

public class HomeController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult ProductDetails()
    {
        return View();
    }

    public IActionResult Product()
    {
        Console.WriteLine("Hello World!");
        return View();
    }
}