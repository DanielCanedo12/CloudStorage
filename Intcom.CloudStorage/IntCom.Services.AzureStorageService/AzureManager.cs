using Intcom.Domain.Entities;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;

namespace IntCom.Services.AzureStorageService
{
    public class AzureManager : IStorageServiceBase
    {
        private readonly CloudBlobClient _blobClient;
        private readonly User _user;

        public AzureManager(User usuario)
        {
            var storageAccount = CloudStorageAccount.Parse(
                ConfigurationManager.AppSettings.Get("StorageConnectionString")
            );

             _blobClient = storageAccount.CreateCloudBlobClient();

            _user = usuario;
        }


        public bool Download(Document file)
        {
            throw new NotImplementedException();
        }

        public List<Document> Listar()
        {
            CloudBlobContainer container = GetContainer(_user);

            List<Document> docs = new List<Document>();
            // Loop over items within the container and output the length and URI.
            foreach (IListBlobItem item in container.ListBlobs())
            {
                if (item.GetType() == typeof(CloudBlockBlob))
                {
                    CloudBlockBlob blob = (CloudBlockBlob)item;

                    Console.WriteLine("Block blob of length {0}: {1}", blob.Properties.Length, blob.Uri);

                }
                else if (item.GetType() == typeof(CloudPageBlob))
                {
                    CloudPageBlob pageBlob = (CloudPageBlob)item;

                    Console.WriteLine("Page blob of length {0}: {1}", pageBlob.Properties.Length, pageBlob.Uri);

                }
                else if (item.GetType() == typeof(CloudBlobDirectory))
                {
                    CloudBlobDirectory directory = (CloudBlobDirectory)item;

                    Console.WriteLine("Directory: {0}", directory.Uri);
                }
            }

            return docs;
        }

        public bool Updload(Document file, string local)
        {
            
            // Retrieve reference to a blob named "myblob".
            CloudBlockBlob blockBlob = GetContainer(_user).GetBlockBlobReference(file.Id.ToString());

            // Create or overwrite the "myblob" blob with contents from a local file.
            using (var fileStream = System.IO.File.OpenRead(local))
            {
                blockBlob.UploadFromStream(fileStream);
            }

            return true;
        }

        private CloudBlobContainer GetContainer(User user)
        {
            CloudBlobContainer container = _blobClient.GetContainerReference(user.CompanyId.ToString());
            container.CreateIfNotExists();

            return container;
        }
    }

    
}
