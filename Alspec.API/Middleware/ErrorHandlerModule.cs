using NLog;

namespace Alspec.API.Middleware
{
	public class ErrorHandlerModule
	{
		private readonly RequestDelegate _next;
		private readonly Logger _logger;
		private readonly IConfiguration _configuration;
		private readonly IHttpContextAccessor _httpContextAccessor;

		public ErrorHandlerModule(
			RequestDelegate next,
			IConfiguration configuration,
			IHttpContextAccessor httpContextAccessor
		)
		{
			this._next = next;
			this._logger = LogManager.GetCurrentClassLogger();

			this._configuration = configuration;
			this._httpContextAccessor = httpContextAccessor;
		}

		public async Task Invoke(HttpContext context)
		{
			try
			{
				await this._next(context);
			}
			catch (Exception error)
			{
				this._logger.Error("ErrorHandlerModule: Exception Raised");

				HttpRequest? request = this._httpContextAccessor.HttpContext?.Request;
				if (request != null)
				{
					string urlPath = request.Method + request.Path;

					string bodyText = context.Items["body"]?.ToString() ?? "No body";
				}

				this._logger.Error($"{error.Message}{Environment.NewLine}{error.StackTrace}");

				throw;
			}
		}

	}
}