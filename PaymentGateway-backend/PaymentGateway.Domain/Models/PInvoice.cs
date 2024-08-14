using System;
using System.Collections.Generic;

namespace PaymentGateway.Domain.Models;

public partial class PInvoice
{
    public int InvoiceId { get; set; }

    public int? UserId { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public decimal TotalAmount { get; set; }

    public virtual PUser? User { get; set; }
}
