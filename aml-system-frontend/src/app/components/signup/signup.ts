import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { registerUser } from '../../../services/api'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  // Form ka data store karne ke liye
  signupData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  async onSignup() {
    // Basic validation
    if (!this.signupData.fullName || !this.signupData.email || !this.signupData.password) {
      this.errorMessage = "Bhai, sab fields fill karna zaroori hai!";
      return;
    }

    // Password match check
    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = "Passwords match nahi kar rahe!";
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      // Backend ko data bhej rahe hain (confirmPassword API ko nahi chahiye toh usay ignore kar denge)
      const dataToSend = {
        fullName: this.signupData.fullName,
        email: this.signupData.email,
        password: this.signupData.password
      };

      const response = await registerUser(dataToSend);
      this.successMessage = response.message || "Account successfully create ho gaya!";
      
      // Thori der baad user ko login page par bhej dein
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

    } catch (error: any) {
      this.errorMessage = error;
    } finally {
      this.isLoading = false;
    }
  }
}