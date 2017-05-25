namespace IntCom.Infra.Data.Migrations
{
    using Intcom.Domain.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Intcom.Infra.Data.Contexts.DefaultContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Intcom.Infra.Data.Contexts.DefaultContext context)
        {
            context.Companies.AddOrUpdate(
                new Company {Id = 1 , Name="EmpresaTeste" }
                );

                context.Users.AddOrUpdate(
                  p => p.Id,
                  new User { Name = "Admin" , Email="danielcanedo@live.com" , CompanyId = context.Companies.First().Id}
                );
           
        }

       
    }
}
