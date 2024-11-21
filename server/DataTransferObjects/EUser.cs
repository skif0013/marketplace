using System.ComponentModel.DataAnnotations;

namespace server.DataTransferObjects
{
    public class EUser
    {
        [Required]
        public string? name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Некорректный адрес")]
        public string? email { get; set; }

        [Required]
        public string? password { get; set; }
    }
}
