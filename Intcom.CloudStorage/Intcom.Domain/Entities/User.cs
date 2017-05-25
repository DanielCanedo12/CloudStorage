namespace Intcom.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public string Email { get; set; }

        public virtual Company Company { get; set; }
    }
}
