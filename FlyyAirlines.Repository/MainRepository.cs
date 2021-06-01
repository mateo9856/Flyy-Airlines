using FlyyAirlines.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository
{
    public class MainRepository<T> : IMainRepository<T> where T : class
    {
        private readonly AppDBContext _dbContext;
        private DbSet<T> table = null;
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
            T GetData = await table.FindAsync(entity);
            table.Remove(GetData);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<T> Get(Guid id)
        {
            return await table.FindAsync(id);
        }

        public async Task<T> Get(string id)
        {
            return await table.FindAsync(id);
        }

        public IEnumerable<T> GetAll()
        {
            return table.ToList();
        }

        public void Update(T entity)
        {
            table.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
    }
}
