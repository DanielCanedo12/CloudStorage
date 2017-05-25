using Intcom.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intcom.Infra.Data.Contexts;
using Intcom.Domain.Interfaces;

namespace IntCom.Infra.Data.Repositories
{
    public class CompanyRepository : RepositoryBase<Company>, ICompanyRepository
    {
        public CompanyRepository(DefaultContext context) : base(context)
        {
        }
    }
}
