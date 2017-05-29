using System;

namespace Intcom.Domain.Entities
{
    public class Document
    {
        public Document()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public int ContainerId { get; set; }
        public int UserId { get; set; }
        public long Length { get; set; }
      //  public virtual Container Container { get;  set; }
        public virtual User User { get; set; }
        public string Extension { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
