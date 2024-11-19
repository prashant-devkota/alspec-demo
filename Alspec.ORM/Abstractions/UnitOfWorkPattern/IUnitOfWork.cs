namespace Alspec.ORM.Abstractions.UnitOfWorkPattern
{
	public interface IUnitOfWork : IDisposable
	{
		Task<int> SaveChangesAsync();
		IQueryable<T> SqlQuery<T>(string sqlQuery, params object[] parameters);
	}
}
