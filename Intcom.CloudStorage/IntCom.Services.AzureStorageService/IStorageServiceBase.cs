using System.Collections.Generic;
using Intcom.Domain.Entities;

namespace IntCom.Services.AzureStorageService
{
    public interface IStorageServiceBase
    {
        bool Updload(Document file, string local);
        bool Download(Document file);
        List<Document> Listar();
    }
}
