using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AMLSystem.API.Data;
using AMLSystem.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace AMLSystem.API.Controllers
{
    // Naya DTO status receive karne ke liye
    public class StatusUpdateDto
    {
        public string Status { get; set; } = string.Empty;
    }

    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        // 1. GET: api/Transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.OrderByDescending(t => t.TransactionDate).ToListAsync();
        }

        // 2. GET: api/Transactions/TXN-987654321
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(string id)
        {
            var transaction = await _context.Transactions.FirstOrDefaultAsync(t => t.TransactionId == id);
            if (transaction == null)
            {
                return NotFound(new { message = "Transaction nahi mili!" });
            }
            return transaction;
        }

        // 3. POST: api/Transactions
        [HttpPost]
        public async Task<ActionResult<Transaction>> CreateTransaction(Transaction transaction)
        {
            if (transaction.TransactionDate == default)
            {
                transaction.TransactionDate = DateTime.UtcNow;
            }

            transaction.Status = "Pending";

            int calculatedScore = 0;
            if (transaction.Amount > 5000000) calculatedScore += 35;
            else if (transaction.Amount > 1000000) calculatedScore += 15;

            string[] riskyCountries = { "Iran", "North Korea", "Syria" };
            if (riskyCountries.Contains(transaction.Country)) calculatedScore += 50;

            transaction.RiskScore = calculatedScore;

            if (transaction.RiskScore >= 70) transaction.Status = "Blocked";
            else if (transaction.RiskScore >= 40) transaction.Status = "Flagged";
            else transaction.Status = "Normal";

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTransaction), new { id = transaction.TransactionId }, transaction);
        }

        // 4. PUT: api/Transactions/TXN-987654321/status (UPDATED WITH AUDIT LOGGING)
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(string id, [FromBody] StatusUpdateDto data)
        {
            var transaction = await _context.Transactions.FirstOrDefaultAsync(t => t.TransactionId == id);

            if (transaction == null) return NotFound(new { message = "Transaction nahi mili!" });

            // 1. Audit Trail: Purana status store karo
            var oldStatus = transaction.Status;

            // 2. Status update karo
            transaction.Status = data.Status;

            // 3. Audit Log Entry create karo
            var auditLog = new AuditLog
            {
                TransactionId = transaction.TransactionId,
                Action = "Status Changed",
                OldStatus = oldStatus,
                NewStatus = data.Status,
                ChangedBy = "Officer-01", // Yahan future mein logged-in user ki ID ayegi
                Timestamp = DateTime.UtcNow
            };

            // 4. Transaction aur Log dono ko database mein add/save karo
            _context.AuditLogs.Add(auditLog);
            await _context.SaveChangesAsync();

            // Webhook Simulation
            Console.WriteLine("=================================================");
            Console.WriteLine($"[WEBHOOK FIRED] To Core Banking System (CBS)");
            Console.WriteLine($"Transaction ID : {transaction.TransactionId}");
            Console.WriteLine($"New Action     : MARKED AS {transaction.Status.ToUpper()}");
            Console.WriteLine($"Audit Logged   : YES (ID: {auditLog.Id})");
            Console.WriteLine("=================================================");

            return Ok(transaction);
        }
    }
}