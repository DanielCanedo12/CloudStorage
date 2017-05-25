using Intcom.Domain.Entities;
using Intcom.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
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
