using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Alspec.Domain.Entities
{
	public class Job
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Key]
		public Guid Id { get; set; }

		public string Title { get; set; }

		public string Description { get; set; }

		public virtual List<SubItem> SubItems { get; set; }
	}
}
