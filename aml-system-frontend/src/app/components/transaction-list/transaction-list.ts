import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { TransactionService } from '../../services/transaction';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-list',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './transaction-list.html',
  styleUrls: ['./transaction-list.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = []; 

  searchTerm: string = '';
  selectedStatus: string = 'All';

  // 👇 Custom Dropdown ke naye variables
  isDropdownOpen: boolean = false;
  statusOptions: string[] = ['All', 'Pending', 'Normal', 'Flagged', 'Blocked'];

  constructor(
    private transactionService: TransactionService,
    private cd: ChangeDetectorRef,
    private router: Router, 
    private zone: NgZone 
  ) {}

  goToDetails(id: string) {
    this.zone.run(() => {
      this.router.navigate(['/transactions', id]).then(() => {
        window.scrollTo(0, 0); 
      });
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.filteredTransactions = data; 
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('API se data lane mein error aaya:', err);
      }
    });
  }

  // 👇 Dropdown toggle karne ka function
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // 👇 Naya option select karne ka function
  selectStatus(status: string) {
    this.selectedStatus = status;
    this.isDropdownOpen = false; // Select hone ke baad dropdown band kardo
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.transactions;

    if (this.selectedStatus !== 'All') {
      filtered = filtered.filter(t => t.status === this.selectedStatus);
    }

    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.transactionId.toLowerCase().includes(term) || 
        t.customerName.toLowerCase().includes(term)
      );
    }

    this.filteredTransactions = filtered;
    this.cd.detectChanges();
  }
}