using Alspec.Domain.Entities;

namespace Alspec.Service.Interfaces
{
	public interface IJobService
	{
		IQueryable<Job> GetAllJobsAsQueryable();
		Task<Job> GetJobByIdAsync(Guid id);
		Task<Job> CreateJobAsync(Job model);
	}
}
