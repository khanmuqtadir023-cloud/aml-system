using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AMLSystem.API.Models
{
    [Index(nameof(TransactionId), IsUnique = true)]
    public class Transaction
    {
        [Key]
        public int Id { get; set; } // Database primary key (Mat badlo)

        [Required]
        public string TransactionId { get; set; } = string.Empty; // Search isi se hogi

        [Required]
        public string AccountNumber { get; set; } = string.Empty;

        [Required]
        public string CustomerName { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public string Currency { get; set; } = "PKR";

        public string Type { get; set; } = string.Empty;

        public string Channel { get; set; } = string.Empty;

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

        public string Counterparty {     get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;

        // 👇 Sirf yahan 'Normal' ki jagah 'Pending' kiya hai
        public string Status { get; set; } = "Pending";

        public int RiskScore { get; set; } = 0;
    }
}