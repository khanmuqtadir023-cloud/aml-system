import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { TransactionService } from '../../services/transaction';
import { Transaction } from '../../models/transaction';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-detail.html'
})
export class TransactionDetailComponent implements OnInit {
  transaction: Transaction | null = null;
  isUpdating: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private cd: ChangeDetectorRef,
    private zone: NgZone 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.transactionService.getTransactionById(id).subscribe({
        next: (data) => {
          this.transaction = data;
          this.cd.detectChanges(); 
        },
        error: (err) => {
          console.error("API Error - Transaction detail nahi mili:", err);
        }
      });
    }
  }

  // 👈 Helper function UI par breakdown dikhane ke liye
  getRiskBreakdown() {
    if (!this.transaction) return { amount: 0, country: 0, behavior: 0 };
    const total = this.transaction.riskScore;
    // Dummy logic for visual breakdown based on total score
    if (total === 0) return { amount: 0, country: 0, behavior: 0 };
    return {
      amount: Math.round(total * 0.4),
      country: Math.round(total * 0.3),
      behavior: Math.round(total * 0.3)
    };
  }

  updateStatus(newStatus: 'Normal' | 'Flagged' | 'Blocked') {
    if (!this.transaction) return;

    // Button ke hisaab se proper action name set karna
    let actionName = '';
    if (newStatus === 'Normal') actionName = 'Mark as Safe';
    if (newStatus === 'Flagged') actionName = 'Escalate Case';
    if (newStatus === 'Blocked') actionName = 'Freeze Transaction';

    Swal.fire({
      title: 'Confirm Action',
      text: `Are you sure you want to ${actionName}?`, 
      icon: 'warning',
      width: '24rem', 
      padding: '1.25rem', 
      showCancelButton: true,
      confirmButtonColor: '#0f172a', 
      cancelButtonColor: '#ef4444',  
      confirmButtonText: `Yes, ${actionName}!`,
      cancelButtonText: 'Cancel',
      reverseButtons: true, 
      customClass: {
        popup: 'rounded-xl shadow-xl', 
        title: 'text-lg font-bold text-slate-800 pt-0 pb-1', 
        htmlContainer: 'text-sm text-slate-500 m-0 pb-3', 
        actions: 'w-full flex justify-center gap-3 mt-1', 
        confirmButton: 'px-5 py-2 rounded-lg text-sm font-semibold',
        cancelButton: 'px-5 py-2 rounded-lg text-sm font-semibold'
      }
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.isUpdating = true; 
        this.cd.detectChanges();

        this.transactionService.updateTransactionStatus(this.transaction!.transactionId, newStatus).subscribe({
          next: () => {
            this.transaction!.status = newStatus; 
            this.isUpdating = false;
            this.cd.detectChanges();
            
            this.showToast('success', `Transaction successfully updated!`);
          },
          error: (err) => {
            console.error("Status update fail ho gaya:", err);
            this.isUpdating = false;
            this.cd.detectChanges();
            
            this.showToast('error', 'Failed to update transaction status.');
          }
        });
      }
    });
  }

  private showToast(iconType: 'success' | 'error', message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({
      icon: iconType,
      title: message
    });
  }

  goBack() {
    this.zone.run(() => {
      this.router.navigate(['/transactions']);
    });
  }
}