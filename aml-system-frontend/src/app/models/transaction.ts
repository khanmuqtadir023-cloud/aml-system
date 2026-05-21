export interface Transaction {
  id: number;
  transactionId: string;
  accountNumber: string;
  customerName: string;
  amount: number;
  currency: string;
  type: string; // Credit / Debit
  channel: string; // ATM, Online, Branch
  transactionDate: string;
  counterparty: string;
  country: string;
  // 👇 Yahan 'Pending' add kar diya hai
  status: 'Pending' | 'Normal' | 'Flagged' | 'Blocked'; 
  riskScore: number; // 0 to 100
}