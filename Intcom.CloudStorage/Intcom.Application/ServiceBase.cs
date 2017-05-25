using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IntCom.Infra.Data.Interfaces;

namespace Intcom.Application
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
