import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  // 1. Top 4 Box Metrics
  public kpis = [
    { title: 'Total Screenings', value: '12,540', trend: '12.5% vs last month', trendClass: 'text-emerald-600 bg-emerald-50' },
    { title: 'Potential Matches', value: '248', trend: '2.8% vs last month', trendClass: 'text-amber-600 bg-amber-50' },
    { title: 'Confirmed Matches', value: '32', trend: '0.5% vs last month', trendClass: 'text-red-600 bg-red-50' },
    { title: 'Cleared (No Match)', value: '12,260', trend: '13.2% vs last month', trendClass: 'text-emerald-600 bg-emerald-50' }
  ];

  // 2. Top Watchlists
  public watchlists = [
    { name: 'UN Consolidated List', count: 118 },
    { name: 'OFAC Sanctions List', count: 56 },
    { name: 'EU Sanctions List', count: 42 },
    { name: 'SBP Watchlist', count: 32 }
  ];

  // 3. Recent Screenings Table Data (Strictly matching your 8 original layout fields)
  public recentScreenings = [
    {
      customerName: 'Muhammad Ali',
      customerId: 'CUST-0001254',
      screeningDate: '20 May 2024 11:45 AM',
      watchlistSearched: 'UN Consolidated List',
      matchStatus: 'Potential Match',
      statusClass: 'bg-amber-50 text-amber-700 border-amber-200',
      matchPercentage: '72%',
      analyst: 'Ali Raza'
    },
    {
      customerName: 'ABC Traders Pvt Ltd',
      customerId: 'CUST-0001255',
      screeningDate: '20 May 2024 10:30 AM',
      watchlistSearched: 'OFAC Sanctions List',
      matchStatus: 'No Match',
      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      matchPercentage: '0%',
      analyst: 'Fatima Khan'
    },
    {
      customerName: 'John Smith',
      customerId: 'CUST-0001256',
      screeningDate: '20 May 2024 09:15 AM',
      watchlistSearched: 'EU Sanctions List',
      matchStatus: 'Confirmed Match',
      statusClass: 'bg-red-50 text-red-700 border-red-200',
      matchPercentage: '100%',
      analyst: 'Usman Ahmed'
    }
  ];
}