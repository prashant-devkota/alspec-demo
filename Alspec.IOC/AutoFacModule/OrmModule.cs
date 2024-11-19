using Autofac;
using Microsoft.EntityFrameworkCore;
using Alspec.ORM.Abstractions.RepositoryPattern;
using Alspec.ORM.Abstractions.UnitOfWorkPattern;
using Alspec.ORM.Context;

namespace Alspec.IOC.AutoFacModule
{
	public class OrmModule : Module
	{
		public OrmModule() { }

		protected override void Load(ContainerBuilder builder)
		{
			builder.Register(c => c.Resolve<AlspecDBContext>()).As<DbContext>().InstancePerLifetimeScope();

			builder.RegisterGeneric(typeof(GenericRepository<>)).As(typeof(IGenericRepository<>));
			builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
			base.Load(builder);
		}
	}
}
