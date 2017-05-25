using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intcom.Domain.Interfaces;
using IntCom.Infra.Data.Interfaces;

namespace Intcom.Application
{
    public class UserService : ServiceBase
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUnitOfWork uow, IUserRepository userRepository) : base(uow)
        {
            _userRepository = userRepository;
        }
    }
}