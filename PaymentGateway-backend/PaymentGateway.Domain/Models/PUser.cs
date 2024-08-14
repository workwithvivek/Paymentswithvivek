using System;
using System.Collections.Generic;

namespace PaymentGateway.Domain.Models;

public partial class PUser
{
    public int UserId { get; set; }

    public string? Name { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? FacebookId { get; set; }

    public string? GoogleId { get; set; }

    public bool? IsDeleted { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public virtual ICollection<PInvoice> PInvoices { get; set; } = new List<PInvoice>();

    public virtual ICollection<PTransaction> PTransactions { get; set; } = new List<PTransaction>();
}
