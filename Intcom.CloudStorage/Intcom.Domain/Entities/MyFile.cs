using System;

namespace Intcom.Domain.Entities
{
    public class MyFile
    {
        public MyFile()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public int ContainerId { get; set; }
        public int CompanyId { get; set; }
        public long Length { get; set; }
      //  public virtual Container Container { get;  set; }
        public virtual Company Company { get; set; }
        public string Extension { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
