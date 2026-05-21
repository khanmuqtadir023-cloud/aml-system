using System;
using System.ComponentModel.DataAnnotations;

namespace AMLSystem.API.Models
{
    public class AuditLog
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string TransactionId { get; set; } = string.Empty;

        [Required]
        public string Action { get; set; } = string.Empty; // e.g., "Status Changed"

        public string? OldStatus { get; set; }

        [Required]
        public string NewStatus { get; set; } = string.Empty;

        [Required]
        public string ChangedBy { get; set; } = "System-Officer";

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}