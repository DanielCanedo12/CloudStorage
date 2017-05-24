using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace IntCom.Services.AzureStorageService
{
    public class AzureManager : IStorageServiceBase
    {
        CloudStorageAccount storageAccount;
        public AzureManager()
        {
                storageAccount = CloudStorageAccount.Parse(
                ConfigurationManager.AppSettings.Get("StorageConnectionString")
             );

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

        }

        public bool Download(string endereco)
        {
            throw new NotImplementedException();
        }

        public bool Listar()
        {
            throw new NotImplementedException();
        }

        public bool Updload(string file)
        {
            throw new NotImplementedException();
        }
    }
}
