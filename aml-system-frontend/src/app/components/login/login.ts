import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginUser } from '../../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Frontend se input lene ke liye variables
  loginData = {
    email: '',
    password: ''
  };
  
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  // Jab user Sign In par click karega toh yeh chalega
  async onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = "Bhai, Email aur Password dono daalna zaroori hai!";
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Backend par API call ja rahi hai
      const response = await loginUser(this.loginData);
      
      alert(response.message); // Kamyabi ka message!
      
      // Agar login theek ho jaye toh Dashboard ya Home par bhej do
      // this.router.navigate(['/dashboard']); 
      
    } catch (error: any) {
      // Backend se jo error aayega wo yahan dikhega
      this.errorMessage = error;
    } finally {
      this.isLoading = false;
    }
  }
}