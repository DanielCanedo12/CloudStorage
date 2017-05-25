using Intcom.Domain.Entities;
using Intcom.Domain.Interfaces;
using Intcom.Infra.Data.Contexts;

namespace IntCom.Infra.Data.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(DefaultContext context) : base(context)
        {
        }
    }
}
