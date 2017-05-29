using System.Collections.Generic;

namespace Intcom.Domain.Entities
{
    public class User
    {

        public User()
        {
            Documents = new List<Document>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public string Email { get; set; }

        public virtual Company Company { get; set; }
        public virtual ICollection<Document> Documents { get; set; }
    }
}
