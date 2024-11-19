using System.Diagnostics.Metrics;
using Alspec.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Alspec.ORM.Context
{
	public partial class AlspecDBContext : DbContext
	{
		public AlspecDBContext(DbContextOptions<AlspecDBContext> options) : base(options)
		{
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			base.OnConfiguring(optionsBuilder);
		}

		public virtual DbSet<Job> Jobs { get; set; }
		public virtual DbSet<SubItem> SubItems { get; set; }

		protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
		{
			configurationBuilder.Properties<decimal>()
				.HavePrecision(20, 8);
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Job>()
				.HasMany(e => e.SubItems)
				.WithOne(e => e.Job).IsRequired()
				.HasForeignKey(e => e.JobId)
				.OnDelete(DeleteBehavior.NoAction);
		}
	}
}
