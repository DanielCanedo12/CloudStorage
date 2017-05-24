using Intcom.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intcom.Infra.Data.EntitiesMapping
{
    public class CompanyConfig : EntityTypeConfiguration<Company>
    {
        public CompanyConfig()
        {
            ToTable("Companies");
        }
    }
}
