import { Component } from '@angular/core';
import { SidebarComponent } from './core/sidebar/sidebar'; // Sidebar ko import kiya

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent], // Yahan list mein SidebarComponent daal diya
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'aml-system';
}