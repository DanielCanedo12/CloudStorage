using IntCom.Infra.Data.Interfaces;

namespace Intcom.Application.Applications
{
    public class ServiceBase
    {
        private readonly IUnitOfWork _uow;

        public ServiceBase(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public void BeginTransaction()
        {
            _uow.BeginTransaction();
        }

        public void Commit()
        {
            _uow.Commit();
        }
    }
}
