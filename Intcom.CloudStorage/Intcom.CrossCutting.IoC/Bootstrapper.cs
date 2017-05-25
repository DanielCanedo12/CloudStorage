using Intcom.Domain.Interfaces;
using Intcom.Infra.Data.Contexts;
using IntCom.Infra.Data.Interfaces;
using IntCom.Infra.Data.Repositories;
using IntCom.Infra.Data.UoW;
using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intcom.CrossCutting.IoC
{
    public class Bootstrapper
    {
        public static void RegisterServices(Container container)
        {
            // Lifestyle.Transient => Uma instancia para cada solicitacao;
            // Lifestyle.Singleton => Uma instancia unica para a classe
            // Lifestyle.Scoped => Uma instancia unica para o request


            // Infra Dados
            container.Register<IUserRepository, UserRepository>(Lifestyle.Scoped);
            container.Register<ICompanyRepository, CompanyRepository>(Lifestyle.Scoped);
            container.Register<IUnitOfWork, UnitOfWork>(Lifestyle.Scoped);
            container.Register<DefaultContext>();

            //container.Register(typeof (IRepository<>), typeof (Repository<>));
        }
    }
}
