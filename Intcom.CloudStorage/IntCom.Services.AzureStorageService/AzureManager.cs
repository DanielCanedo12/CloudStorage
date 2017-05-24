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
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.GetContainerReference("mycontainer");

            // Retrieve reference to a blob named "myblob".
            CloudBlockBlob blockBlob = container.GetBlockBlobReference("myblob");

            // Create or overwrite the "myblob" blob with contents from a local file.
            using (var fileStream = System.IO.File.OpenRead(@"path\myfile"))
            {
                blockBlob.UploadFromStream(fileStream);
            }

            return true;
        }
    }
}
