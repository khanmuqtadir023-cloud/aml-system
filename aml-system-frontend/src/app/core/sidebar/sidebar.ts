import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  isSidebarClosed = false;
  
  // Watchlist Menu State
  isMenuClosed = false;
  
  // Transaction Menu State (By default band rakha hai)
  isTxnMenuClosed = true;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleMenu() {
    this.isMenuClosed = !this.isMenuClosed;
  }

  toggleTxnMenu() {
    this.isTxnMenuClosed = !this.isTxnMenuClosed;
  }
}