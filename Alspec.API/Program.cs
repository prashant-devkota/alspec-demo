using Alspec.API.Middleware;
using Alspec.IOC.AutoFacModule;
using Alspec.ORM.Context;
using Alspec.ORM.Factory;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using ResourceMax.Service.Services;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

IConfiguration configuration = new ConfigurationBuilder()
	.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
	.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
.AddEnvironmentVariables()
	.Build();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddDbContext<AlspecDBContext>(options =>
{
	options.UseSqlServer(configuration.GetConnectionString("AlspecDbEntities"), o =>
	{
		o.MigrationsAssembly(typeof(AlspecDBContext).Assembly.FullName);
		o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
	});
	options.UseLazyLoadingProxies(false);
});

builder.Services.AddScoped<IDbContextProvider, DbContextProvider>();

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder => containerBuilder.RegisterModule(new DataServiceModule()));
builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder => containerBuilder.RegisterModule(new OrmModule()));

builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddSingleton<IDatabaseInitializer, DatabaseInitializer>();
builder.Services.AddControllers()
	.AddNewtonsoftJson(options =>
	{
		options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
	});
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSignalR();

builder.Services.AddSwaggerGen(options =>
{
});

WebApplication app = builder.Build();
using (IServiceScope serviceScope = app.Services.CreateScope())
{
	IServiceProvider serviceProvider = serviceScope.ServiceProvider;

	try
	{
		IDatabaseInitializer databaseInitializer = serviceProvider.GetRequiredService<IDatabaseInitializer>();
		await databaseInitializer.SeedAsync();
	}
	catch (Exception ex)
	{
		Console.WriteLine($"An error occurred during database seeding: {ex.Message}");
	}
}

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.Use(async (context, next) =>
{
	context.Response.OnStarting(() =>
	{
		if (!context.Response.Headers.ContainsKey("X-Frame-Options"))
		{
			context.Response.Headers.Add("X-Frame-Options", "deny");
		}
		if (!context.Response.Headers.ContainsKey("Referrer-Policy"))
		{
			context.Response.Headers.Add("Referrer-Policy", "no-referrer");
		}
		if (!context.Response.Headers.ContainsKey("X-Content-Type-Options"))
		{
			context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
		}
		if (!context.Response.Headers.ContainsKey("Content-Security-Policy"))
		{
			context.Response.Headers.Add("Content-Security-Policy",
				"default-src 'self'; " +
				"connect-src 'self' *; " +
				"script-src 'self' 'unsafe-inline' 'unsafe-eval';" +
				"img-src 'self' data:; " +
				"object-src 'self' data:; " +
				"frame-src * data:;");
		}

		return Task.CompletedTask;
	});

	await next.Invoke();
});
app.UseMiddleware<ErrorHandlerModule>();

app.UseCors(policy =>
{
	policy.AllowAnyOrigin()
		.AllowAnyMethod()
		.AllowAnyHeader()
		.WithHeaders(HeaderNames.ContentType);
});

app.UseHttpsRedirection();
app.UseRouting();

app.MapControllers();

app.Run();