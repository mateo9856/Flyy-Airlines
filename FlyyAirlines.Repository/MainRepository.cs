using FlyyAirlines.Data.Models;
using FlyyAirlines.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<T> Get(string id)
        {
            return await table.FirstOrDefaultAsync(s => s.Id == id);
        }

        public IQueryable<T> GetAll()
        {
            return table;
        }

        public void Update(T entity)
        {
            table.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
    }
}
