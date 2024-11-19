using Autofac;

namespace Alspec.IOC.AutoFacModule
{
	public class DataServiceModule : Module
	{
		public DataServiceModule()
		{
		}

		protected override void Load(ContainerBuilder builder)
		{
			builder.RegisterAssemblyTypes(System.Reflection.Assembly.Load("Alspec.Service"))
				.Where(t => t.Name.EndsWith("Service"))
				.AsImplementedInterfaces()
				.InstancePerLifetimeScope();

			base.Load(builder);
		}
	}
}