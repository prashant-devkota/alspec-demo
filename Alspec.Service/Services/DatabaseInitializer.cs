using System.Reflection.Emit;
using Alspec.Domain.Entities;
using Alspec.ORM.Context;
using Microsoft.EntityFrameworkCore;

namespace ResourceMax.Service.Services
{
	public interface IDatabaseInitializer
	{
		Task SeedAsync();
	}

	public class DatabaseInitializer : IDatabaseInitializer
	{
		private readonly AlspecDBContext _context;

		public DatabaseInitializer(
			AlspecDBContext context
		)
		{
			this._context = context;
		}

		public virtual async Task SeedAsync()
		{
			try
			{
				await this._context.Database.MigrateAsync().ConfigureAwait(false);
				this.SeedJobs(this._context);
			}
			catch (Exception ex)
			{
				throw;
			}
		}

		private void SeedJobs(AlspecDBContext context)
		{
			Job? job1 = context.Set<Job>().FirstOrDefault(x => x.Id == new Guid("2b4eddc1-400e-470f-9eb4-3ef5e15f8d9b"));
			if (job1 == null)
			{
				context.Set<Job>().Add(
					new Job
					{
						Id = new Guid("2b4eddc1-400e-470f-9eb4-3ef5e15f8d9b"),
						Title = "Create a window frame",
						Description = "Find out all the things we need to do for this task.",
						SubItems = new List<SubItem>
						{
							new SubItem {
								Title = "2x2m square window",
								Description = "Use aluminium frame.",
								Status ="Draft"
							},
							new SubItem {
								Title = "3x3 window",
								Description = "Use slim frames.",
								Status ="In Progress"
							},
							new SubItem {
								Title = "3x4 window",
								Description = "Use slim frames.",
								Status ="Completed"
							}
						}
					});
				context.SaveChanges();
			}

			Job? job2 = context.Set<Job>().FirstOrDefault(x => x.Id == new Guid("66d216c6-df02-4582-b88c-94b15e7355a6"));
			if (job2 == null)
			{
				context.Set<Job>().Add(
					new Job
					{
						Id = new Guid("66d216c6-df02-4582-b88c-94b15e7355a6"),
						Title = "Create a door frame",
						Description = "Find out all the things we need to do for this task.",
						SubItems = new List<SubItem>
						{
							new SubItem {
								Title = "2x2m square window",
								Description = "Use aluminium frame.",
								Status ="Draft"
							},
							new SubItem {
								Title = "3x3 window",
								Description = "Use slim frames.",
								Status ="Draft"
							},
							new SubItem {
								Title = "3x4 window",
								Description = "Use slim frames.",
								Status ="Completed"
							}
						}
					});
				context.SaveChanges();
			}

			Job? job3 = context.Set<Job>().FirstOrDefault(x => x.Id == new Guid("e074f253-88d1-4a3d-b4eb-fcac50d010d4"));
			if (job3 == null)
			{
				context.Set<Job>().Add(
					new Job
					{
						Id = new Guid("e074f253-88d1-4a3d-b4eb-fcac50d010d4"),
						Title = "Create a 5m pole",
						Description = "Find out all the things we need to do for this task.",
						SubItems = new List<SubItem>
						{
							new SubItem {
								Title = "I suppose a square window",
								Description = "Use aluminium frame.",
								Status ="Draft"
							},
							new SubItem {
								Title = "Not sure",
								Description = "Use slim frames.",
								Status ="In Progress"
							},
							new SubItem {
								Title = "3x4 window",
								Description = "Use slim frames.",
								Status ="Completed"
							}
						}
					});
				context.SaveChanges();
			}
		}
	}
}