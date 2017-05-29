using System.Data.Entity.ModelConfiguration;
using Intcom.Domain.Entities;

namespace IntCom.Infra.Data.EntitiesMapping
{
    public class DocumentConfig : EntityTypeConfiguration<Document>
    {
        public DocumentConfig()
        {
            HasKey(u => u.Id);


            HasRequired(t => t.User)
                .WithMany(t => t.Documents)
                .HasForeignKey(d => d.UserId);

            ToTable("Documents");
        }
    }
}
