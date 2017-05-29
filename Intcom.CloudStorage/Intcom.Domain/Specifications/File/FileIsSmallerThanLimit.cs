using DomainValidation.Interfaces.Specification;
using Intcom.Domain.Entities;

namespace Intcom.Domain.Specifications.File
{
    class FileIsSmallerThanLimit : ISpecification<Document>
    {
        public bool IsSatisfiedBy(Document entity)
        {
            // Criar Constantes
            return entity.Length < 20000;
        }
    }
}
