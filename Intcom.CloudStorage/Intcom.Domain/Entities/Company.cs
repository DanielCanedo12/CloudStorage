using System.Collections.Generic;

namespace Intcom.Domain.Entities
{
    public class Company
    {
        public Company()
        {
            Users = new List<User>();
        }

        public int Id    { get; set; }
        public string Name { get; set; }
        public long Limit { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
