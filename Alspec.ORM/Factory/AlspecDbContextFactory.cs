using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Alspec.ORM.Context;
using Alspec.Domain.Entities;

namespace Alspec.ORM.Factory
{
	public class AlspecDbContextFactory : IDesignTimeDbContextFactory<AlspecDBContext>
	{
		private IConfiguration Configuration
		{
			get
			{
				return new ConfigurationBuilder()
					.SetBasePath(Directory.GetCurrentDirectory())
					.AddJsonFile("appsettings.json")
					.Build();
			}
		}

		public AlspecDBContext CreateDbContext(string[] args)
		{
			string connectionString = this.Configuration.GetConnectionString("AlspecDBEntities");

			DbContextOptionsBuilder<AlspecDBContext> optionsBuilder = new DbContextOptionsBuilder<AlspecDBContext>();
			optionsBuilder
				.UseLazyLoadingProxies()
				.UseSqlServer(connectionString)
				.UseSeeding((context, _) =>
				{
					Job? job1 = context.Set<Job>().FirstOrDefault(x => x.Title == "Create a window frame");
					if (job1 == null)
					{
						context.Set<Job>().Add(new Job { Title = "Create a window frame" });
						context.SaveChanges();
					}
				})
				.UseAsyncSeeding(async (context, _, cancellationToken) =>
				{
					Job? job1 = await context.Set<Job>().FirstOrDefaultAsync(x => x.Title == "Create a window frame", cancellationToken);
					if (job1 == null)
					{
						context.Set<Job>().Add(new Job { Title = "Create a window frame" });
						await context.SaveChangesAsync(cancellationToken);
					}
				});

			return new AlspecDBContext(optionsBuilder.Options);
		}
	}
}