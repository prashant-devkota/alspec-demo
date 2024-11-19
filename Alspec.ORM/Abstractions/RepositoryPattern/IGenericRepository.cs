using System.Linq.Expressions;

namespace Alspec.ORM.Abstractions.RepositoryPattern
{
	public interface IGenericRepository<TEntity> : IDisposable where TEntity : class
	{
		IQueryable<TEntity> GetAllAsQueryable();
		TEntity Get<TDataType>(TDataType id) where TDataType : struct;
		Task Patch<TDataType>(TDataType id, TEntity patch) where TDataType : struct;
		TEntity Get<TDataType>(TDataType id, Expression<Func<TEntity, object>> includes, Expression<Func<TEntity, bool>> predicate) where TDataType : struct;
		Task<TEntity> GetAsync<TDataType>(TDataType id) where TDataType : struct;
		Task<TEntity> GetAsync<TDataType>(TDataType id, Expression<Func<TEntity, object>> includes, Expression<Func<TEntity, bool>> predicate) where TDataType : struct;
		IEnumerable<TEntity> GetAll();
		Task<IEnumerable<TEntity>> GetAllAsync();
		IEnumerable<TEntity> GetAll(Expression<Func<TEntity, object>> includes);
		IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate);
		IEnumerable<TEntity> GetAll(Expression<Func<TEntity, object>> includes, Expression<Func<TEntity, bool>> predicate);
		Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);
		TEntity Add(TEntity entity);
		IEnumerable<TEntity> AddRange(IEnumerable<TEntity> entities);
		void Update(TEntity entity);
		void Delete(TEntity entity);
		void Rollback(object entity);
		void Rollback();
	}
}