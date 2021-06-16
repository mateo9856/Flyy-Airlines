using FlyyAirlines.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository
{
    public interface IMainRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> EntityWithEagerLoad(Expression<Func<T, bool>> filter, string[] children);
        Task<IEnumerable<T>> GetAll(string[] children);
        IEnumerable<T> GetAll();
        Task<T> Get(string id);
        Task Add(T entity);
        void Update(T entity);
        Task Delete(T entity);
    }
}
