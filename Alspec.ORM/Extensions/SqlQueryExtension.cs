using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Alspec.ORM.Extensions
{
	public static class SqlQueryExtension
	{
		public static IEnumerable<T> ExecuteSqlQuery<T>(this DbContext db, string sql, params object[] parameters) where T : class
		{
			using (ContextForQueryType<T> db2 = new ContextForQueryType<T>(db.Database.GetDbConnection()))
			{
				return db2.Set<T>().FromSqlRaw(sql, parameters).ToList();
			}
		}

		private class ContextForQueryType<T> : DbContext where T : class
		{
			private readonly DbConnection connection;

			public ContextForQueryType(DbConnection connection)
			{
				this.connection = connection;
			}

			protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
			{
				optionsBuilder.UseSqlServer(this.connection, options => options.EnableRetryOnFailure());
				base.OnConfiguring(optionsBuilder);
			}

			protected override void OnModelCreating(ModelBuilder modelBuilder)
			{
				modelBuilder.Entity<T>().HasNoKey();
				base.OnModelCreating(modelBuilder);
			}
		}
	}
}
