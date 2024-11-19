using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Alspec.ORM.Factory
{
	public interface IDbContextProvider
	{
		T Get<T>()
			where T : DbContext;
	}

	public class DbContextProvider : IDbContextProvider
	{
		protected IServiceProvider ServiceProvider { get; }

		public DbContextProvider(IServiceProvider serviceProvider)
		{
			this.ServiceProvider = serviceProvider;
		}

		public T Get<T>()
			where T : DbContext
		{
			return this.ServiceProvider.GetRequiredService<T>();
		}
	}
}