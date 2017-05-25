namespace IntCom.Infra.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterandoCompany : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Companies", "Limit", c => c.Long(nullable: false, defaultValue: 2000000));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Companies", "Limit");
        }
    }
}
