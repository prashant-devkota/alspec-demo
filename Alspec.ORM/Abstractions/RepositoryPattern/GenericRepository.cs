using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Alspec.ORM.Abstractions.RepositoryPattern
{
	public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
	{
		protected readonly DbContext _dbContext;
		private bool _disposed;

		public GenericRepository(DbContext dbContext)
		{
			this._dbContext = dbContext;
		}

		public IQueryable<TEntity> GetAllAsQueryable()
		{
			return this._dbContext.Set<TEntity>().AsQueryable();
		}

		public TEntity Get<TDataType>(TDataType id) where TDataType : struct
		{
			return this._dbContext.Set<TEntity>().Find(id);
		}

		public async Task Patch<TDataType>(TDataType id, TEntity patch) where TDataType : struct
		{
			TEntity entity = await this._dbContext.Set<TEntity>().FindAsync(id);
			this._dbContext.Entry(entity).CurrentValues.SetValues(patch);
			this._dbContext.Entry(entity).State = EntityState.Modified;
		}

		public TEntity Get<TDataType>(TDataType Id, Expression<Func<TEntity, object>> includes, Expression<Func<TEntity, bool>> predicate) where TDataType : struct
		{
			return this._dbContext.Set<TEntity>().Include(includes).SingleOrDefault(predicate);
		}

		public async Task<TEntity> GetAsync<TDataType>(TDataType id) where TDataType : struct
		{
			return await this._dbContext.Set<TEntity>().FindAsync(id);
		}

		public Task<TEntity> GetAsync<TDataType>(TDataType Id, Expression<Func<TEntity, object>> includes, Expression<Func<TEntity, bool>> predicate) where TDataType : struct
		{
			return this._dbContext.Set<TEntity>().Include(includes).SingleOrDefaultAsync(predicate);
		}

		public IEnumerable<TEntity> GetAll()
		{
			return this._dbContext.Set<TEntity>().ToList();
		}

		public async Task<IEnumerable<TEntity>> GetAllAsync()
		{
			return await this._dbContext.Set<TEntity>().ToListAsync();
		}

		public IEnumerable<TEntity> GetAll(Expression<Func<TEntity, object>> includes)
		{
			return this._dbContext.Set<TEntity>().Include(includes);
		}

		public IEnumerable<TEntity> GetAll(Expression<Func<TEntity, object>> includes, Expression<Func<TEntity, bool>> predicate)
		{
			return this._dbContext.Set<TEntity>().Include(includes).Where(predicate).ToList();
		}

		public IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate)
		{
			return this._dbContext.Set<TEntity>().Where(predicate);
		}

		public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
		{
			return await this._dbContext.Set<TEntity>().FirstOrDefaultAsync(predicate);
		}

		public TEntity Add(TEntity entity)
		{
			EntityEntry entry = this._dbContext.Set<TEntity>().Add(entity);
			return (TEntity)entry.Entity;
		}

		public IEnumerable<TEntity> AddRange(IEnumerable<TEntity> entities)
		{
			this._dbContext.Set<TEntity>().AddRange(entities);
			return entities;
		}

		public virtual void Update(TEntity entity)
		{
			this._dbContext.Entry(entity).State = EntityState.Modified;
		}

		public void Delete(TEntity entity)
		{
			this._dbContext.Set<TEntity>().Attach(entity);
			this._dbContext.Entry(entity).State = EntityState.Deleted;
		}

		public void Rollback(object entity)
		{
			if (this._dbContext.Entry(entity).State == EntityState.Modified)
			{
				this._dbContext.Entry(entity).CurrentValues.SetValues(this._dbContext.Entry(entity).OriginalValues);
				this._dbContext.Entry(entity).State = EntityState.Unchanged;
			}
			else if (this._dbContext.Entry(entity).State == EntityState.Added)
			{
				this._dbContext.Entry(entity).State = EntityState.Detached;
			}
			else if (this._dbContext.Entry(entity).State == EntityState.Deleted)
			{
				this._dbContext.Entry(entity).State = EntityState.Unchanged;
			}
		}

		public void Rollback()
		{
			List<EntityEntry> changedEntries = this._dbContext.ChangeTracker.Entries()
				.Where(x => x.State != EntityState.Unchanged).ToList();

			foreach (EntityEntry entry in changedEntries)
			{
				this.Rollback(entry.Entity);
			}
		}

		public void Dispose()
		{
			this.Dispose(true);
			GC.SuppressFinalize(this);
		}

		public virtual void Dispose(bool disposing)
		{
			if (!this._disposed)
			{
				if (disposing)
				{
					this._dbContext.Dispose();
				}
			}

			this._disposed = true;
		}
	}
}