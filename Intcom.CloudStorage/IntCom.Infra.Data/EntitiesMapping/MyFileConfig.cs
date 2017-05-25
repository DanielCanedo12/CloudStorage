using System.Data.Entity.ModelConfiguration;
using Intcom.Domain.Entities;

namespace IntCom.Infra.Data.EntitiesMapping
{
    public class MyFileConfig : EntityTypeConfiguration<MyFile>
    {
        public MyFileConfig()
        {
            HasKey(u => u.Id);

            ToTable("Files");
        }
    }
}
