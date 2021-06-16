using FlyyAirlines.Data.Models;
using FlyyAirlines.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository
{
    public class MainRepository<T> : IMainRepository<T> where T : BaseEntity
    {
        private readonly AppDBContext _dbContext;
        private DbSet<T> table;
        public MainRepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
            table = dbContext.Set<T>();
        }

        public async Task Add(T entity)
        {
            await table.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(T entity)
        {
            table.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> EntityWithEagerLoad(Expression<Func<T, bool>> filter, string[] children)
        {
            IQueryable<T> query = table;
            foreach(string entity in children)
            {
                query = query.Include(entity);
            }
            return await query.Where(filter).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAll(string[] children)
        {
            IQueryable<T> query = table;
            foreach(string entity in children)
            {
                query = query.Include(entity);
            }
            Console.WriteLine(query);
            return query.AsEnumerable();
        }

        public async Task<T> Get(string id)
        {
            var data = await table.SingleOrDefaultAsync(s => s.Id == id);
            return data;
        }

        public IEnumerable<T> GetAll()
        {
            return table.AsEnumerable();
        }

        public void Update(T entity)
        {
            table.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }
    }
}
