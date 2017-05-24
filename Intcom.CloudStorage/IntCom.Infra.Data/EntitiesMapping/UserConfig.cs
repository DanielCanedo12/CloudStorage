using Intcom.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intcom.Infra.Data.EntitiesMapping
{
    public class UserConfig : EntityTypeConfiguration<User>
    {
        public UserConfig()
        {
            HasKey(u => u.Id);

            Property(c => c.Name)
                .IsRequired();

            Property(c => c.Email)
                .IsRequired()
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute() { IsUnique = true }));

            HasRequired(t => t.Company)
                .WithMany(t => t.Users)
                .HasForeignKey(d => d.CompanyId);

            ToTable("Users");
        }


    }
}
