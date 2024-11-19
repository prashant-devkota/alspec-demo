using Alspec.Domain.Entities;
using Alspec.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Alspec.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class JobsController : ControllerBase
	{
		private readonly IJobService _jobService;

		public JobsController(
			IJobService jobService
		)
		{
			this._jobService = jobService;
		}

		/// <summary>
		/// Test API
		/// </summary>
		/// <returns></returns>
		// GET api/jobs/test
		[Route("test")]
		[HttpGet]
		public IActionResult GetTestAsync()
		{
			return this.Ok(new { status = "Success", message = "API Works!!!" });
		}

		/// <summary>
		/// Get a list of all jobs
		/// </summary>
		/// <returns></returns>
		// GET api/jobs
		[HttpGet]
		public IActionResult GetJobsAsync()
		{
			List<Job> jobs = this._jobService.GetAllJobsAsQueryable()
				.ToList();

			return this.Ok(jobs);
		}

		/// <summary>
		/// Get job by ID
		/// </summary>
		/// <returns></returns>
		/// <param name="id">job ID</param>
		// GET api/jobs/{id}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetJobById(Guid id)
		{
			Job result = await this._jobService.GetJobByIdAsync(id);
			return this.Ok(result);
		}

		/// <summary>
		/// Create job
		/// </summary>
		/// <returns></returns>
		/// <param name="model">job data</param>
		// POST api/jobs
		[HttpPost]
		public async Task<IActionResult> CreateJobsAsync([FromBody] Job model)
		{
			return this.Ok(await this._jobService.CreateJobAsync(model));
		}
	}
}
