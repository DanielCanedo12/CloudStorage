using System.Collections.Generic;
using Intcom.Domain.Entities;

namespace Intcom.Application.ViewModels
{
    public class CompanyViewModel
    {
        public CompanyViewModel()
        {
            Users = new List<UserViewModel>();
            Files = new List<DocumentViewModel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public long Limit { get; set; }

        public virtual ICollection<UserViewModel> Users { get; set; }
        public virtual ICollection<DocumentViewModel> Files { get; set; }
    }
}