using System;
using System.ComponentModel.DataAnnotations;

namespace Intcom.Application.ViewModels
{
    public class DocumentViewModel
    {
        public DocumentViewModel()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public int ContainerId { get; set; }
        [Required(ErrorMessage = "A Companhia é obrigatório")]
        public int CompanyId { get; set; }
        public long Length { get; set; }
        //  public virtual Container Container { get;  set; }
        public virtual CompanyViewModel Company { get; set; }
        public string Extension { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}