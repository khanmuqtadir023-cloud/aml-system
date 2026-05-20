import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // 👈 Yahan se SidebarComponent hata diya kyunke ab ye direct route se chal raha hai
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'aml-system';
}