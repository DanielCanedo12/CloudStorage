namespace IntCom.Services.AzureStorageService
{
    public interface IStorageServiceBase
    {
        bool Updload(string file);
        bool Download(string endereco);
        bool Listar();
    }
}
