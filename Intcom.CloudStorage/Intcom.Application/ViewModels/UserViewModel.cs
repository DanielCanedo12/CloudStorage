namespace Intcom.Application.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public string Email { get; set; }

        public virtual CompanyViewModel Company { get; set; }
    }
}