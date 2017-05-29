using System.ComponentModel.DataAnnotations;

namespace Intcom.Application.ViewModels
{
    public class LoginViewModel
    {
        public int IdPessoa { get; set; }

        [Required(ErrorMessage = "Você deve preencher o seu login")]
        [EmailAddress(ErrorMessage = "Você deve preencher o seu login com um e-mail válido!")]
        public string User { get; set; }

        [Required(ErrorMessage = "Você deve preencher sua senha.")]
        public string Pass { get; set; }

        public bool Remember { get; set; } = false;
    }
}