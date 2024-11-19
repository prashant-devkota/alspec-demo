using System.Collections;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Alspec.ORM.Abstractions.UnitOfWorkPattern;

public class UnitOfWork : IUnitOfWork
{
	private bool _disposed;
	private readonly DbContext _context;

	public UnitOfWork(DbContext context)
	{
		this._context = context;
	}

	public int SaveChanges()
	{
		try
		{
			this.ValidateContextChanges();
			return this._context.SaveChanges();
		}
		catch (ValidationException ex)
		{
			throw new Exception(this.GetDbEntityValidationExceptionMessage(ex), ex);
		}
	}

	public async Task<int> SaveChangesAsync()
	{
		try
		{
			this.ValidateContextChanges();
			return await this._context.SaveChangesAsync();
		}
		catch (ValidationException ex)
		{
			throw new Exception(this.GetDbEntityValidationExceptionMessage(ex), ex);
		}
	}

	public IQueryable<T> SqlQuery<T>(string sqlQuery, params object[] parameters)
	{
		return this._context.Database.SqlQueryRaw<T>(sqlQuery, parameters);
	}

	public void Dispose()
	{
		this.Dispose(true);
		GC.SuppressFinalize(this);
	}

	public virtual void Dispose(bool disposing)
	{
		if (!this._disposed)
		{
			if (disposing)
			{
				this._context.Dispose();
			}
		}

		this._disposed = true;
	}

	private void ValidateContextChanges()
	{
		IEnumerable entities = this._context.ChangeTracker.Entries()
			.Where(e => e.State == EntityState.Added || e.State == EntityState.Modified)
			.Select(e => e.Entity);

		foreach (object entity in entities)
		{
			ValidationContext validationContext = new ValidationContext(entity);
			Validator.ValidateObject(entity, validationContext, validateAllProperties: true);
		}
	}

	private string GetDbEntityValidationExceptionMessage(ValidationException ex)
	{
		string errorDetails = ex.Message + "\n";

		foreach (string mem in ex.ValidationResult.MemberNames)
		{
			errorDetails += "Entity of type \"" + mem + "\" in state \"" + "\" has the following validation errors\n";
			errorDetails += ex.ValidationResult.ErrorMessage;
		}

		return errorDetails;
	}
}
