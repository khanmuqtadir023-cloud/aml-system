import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'https://localhost:7041/api/Transactions'; 

  constructor(private http: HttpClient) { }

  // Transaction List ke liye saara data lana
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  // Transaction Detail ke liye single record lana (Fixed: string ID)
  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  // Test data add karne ke liye
  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  // 👇 Status update karne ke liye naya function add kiya hai
  updateTransactionStatus(id: string, status: string): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}/status`, { status });
  }
}