using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainValidation.Interfaces.Specification;
using Intcom.Domain.Entities;

namespace Intcom.Domain.Specifications.File
{
    class FileIsSmallerThanLimit : ISpecification<MyFile>
    {
        public bool IsSatisfiedBy(MyFile entity)
        {
            // Criar Constantes
            return entity.Length < 20000;
        }
    }
}
