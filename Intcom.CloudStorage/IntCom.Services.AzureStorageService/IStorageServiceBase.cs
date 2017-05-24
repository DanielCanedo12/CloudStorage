using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntCom.Services.AzureStorageService
{
    public interface IStorageServiceBase
    {
        bool Updload(string file);
        bool Download(string endereco);
        bool Listar();
    }
}
