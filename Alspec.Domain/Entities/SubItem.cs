using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Alspec.Domain.Entities
{
	public class SubItem
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Key]
		public Guid ItemId { get; set; }

		[ForeignKey("Job")]
		public Guid JobId { get; set; }

		public virtual Job Job { get; set; }

		public string Title { get; set; }

		public string Description { get; set; }

		public string Status { get; set; }
	}
}
