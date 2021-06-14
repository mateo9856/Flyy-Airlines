using FlyyAirlines.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository
{
    public interface IMainRepository<T> where T : BaseEntity
    {
        IEnumerable<T> GetAll();
        Task<T> Get(Guid id);
        Task Add(T entity);
        void Update(T entity);
        Task Delete(T entity);
    }
}
