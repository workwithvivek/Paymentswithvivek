using System;
using System.Collections.Generic;

namespace PaymentGateway.Domain.Models;

public partial class PTransaction
{
    public int TransactionId { get; set; }

    public int? UserId { get; set; }

    public decimal TransactionAmount { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string TransactionStatus { get; set; } = null!;

    public DateTime? TransactionDate { get; set; }

    public virtual PUser? User { get; set; }
}
