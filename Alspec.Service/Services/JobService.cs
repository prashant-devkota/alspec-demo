using Alspec.Domain.Entities;
using Alspec.ORM.Abstractions.RepositoryPattern;
using Alspec.ORM.Abstractions.UnitOfWorkPattern;
using Alspec.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Alspec.Service.Services
{
	public class JobService : IJobService
	{
		private readonly IGenericRepository<Job> _jobRepository;
		private readonly IUnitOfWork _unitOfWork;

		public JobService(
			IGenericRepository<Job> jobRepository,
			IUnitOfWork unitOfWork
		)
		{
			this._jobRepository = jobRepository;
			this._unitOfWork = unitOfWork;
		}

		public IQueryable<Job> GetAllJobsAsQueryable()
		{
			IQueryable<Job> result = this._jobRepository.GetAllAsQueryable().Include(x => x.SubItems);
			return result;
		}

		public async Task<Job> GetJobByIdAsync(Guid id)
		{
			Job result = await this.GetAllJobsAsQueryable()
				.FirstOrDefaultAsync(x => x.Id == id);
			return result;
		}

		public async Task<Job> CreateJobAsync(Job model)
		{
			this._jobRepository.Add(model);
			await this._unitOfWork.SaveChangesAsync();
			return model;
		}
	}
}
