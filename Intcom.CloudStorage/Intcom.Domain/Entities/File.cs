using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intcom.Domain.Entities
{
    class File
    {
        public Guid Id { get; set; }
        public virtual Container Container { get;  set; }
        public virtual Company Company { get; set; }
        public string Extension { get; set; }
    }
}
