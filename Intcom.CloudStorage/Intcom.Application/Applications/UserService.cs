using Intcom.Domain.Interfaces;
using IntCom.Infra.Data.Interfaces;

namespace Intcom.Application.Applications
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