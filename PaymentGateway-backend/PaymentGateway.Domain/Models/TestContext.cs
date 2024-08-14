using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PaymentGateway.Domain.Models;

public partial class TestContext : DbContext
{
    public TestContext()
    {
    }

    public TestContext(DbContextOptions<TestContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PInvoice> PInvoices { get; set; }

    public virtual DbSet<PTransaction> PTransactions { get; set; }

    public virtual DbSet<PUser> PUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PInvoice>(entity =>
        {
            entity.HasKey(e => e.InvoiceId).HasName("PK__P_INVOIC__D796AAD589813AB2");

            entity.ToTable("P_INVOICE");

            entity.Property(e => e.InvoiceId).HasColumnName("InvoiceID");
            entity.Property(e => e.InvoiceDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.PInvoices)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__P_INVOICE__UserI__593122D0");
        });

        modelBuilder.Entity<PTransaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__P_TRANSA__55433A4B1817DE34");

            entity.ToTable("P_TRANSACTION");

            entity.Property(e => e.TransactionId).HasColumnName("TransactionID");
            entity.Property(e => e.PaymentMethod)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TransactionAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TransactionDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TransactionStatus)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.PTransactions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__P_TRANSAC__UserI__556091EC");
        });

        modelBuilder.Entity<PUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__P_USER__1788CCAC19D2BC29");

            entity.ToTable("P_USER");

            entity.HasIndex(e => e.Email, "UQ__P_USER__A9D1053443BAC1AC").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FacebookId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("FacebookID");
            entity.Property(e => e.GoogleId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("GoogleID");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
