using Intcom.Infra.Data.Contexts;
using IntCom.Infra.Data.Interfaces;
using System;

namespace IntCom.Infra.Data.UoW
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DefaultContext _context;
        private bool _disposed;

        public UnitOfWork(DefaultContext context)
        {
            _context = context;
        }

        public void BeginTransaction()
        {
            _disposed = false;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
