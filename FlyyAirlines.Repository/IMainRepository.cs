using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository
{
    public interface IMainRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        Task<T> Get(Guid id);
        Task<T> Get(string id);
        Task Add(T entity);
        void Update(T entity);
        Task Delete(T entity);
    }
}
