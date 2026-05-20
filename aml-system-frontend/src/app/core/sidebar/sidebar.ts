import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 [class.hidden] aur conditional classes ke liye zaroori hai

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  isSidebarClosed = false;
  isMenuClosed = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleMenu() {
    this.isMenuClosed = !this.isMenuClosed;
  }
}