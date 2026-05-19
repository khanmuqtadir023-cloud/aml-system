import { Routes } from '@angular/router';
// Apne components ko sahi se import karein (paths check kar lijiyega)
import { Login } from '../app/components/login/login'; 
import { Signup } from '../app/components/signup/signup';

export const routes: Routes = [
  // 1. Default Route: Agar user khali URL par aaye toh direct login par le jao
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },

  // 2. Auth Routes (Bina Sidebar ke load honge)
  { 
    path: 'login', 
    component: Login 
  },
  { 
    path: 'signup', 
    component: Signup 
  },

  // 3. Dashboard / Screening Route (Yahan user login ke baad aayega)
  // Chonke humne app.html me Sidebar lagaya hua hai, toh is route par aate hi Sidebar khud khul jayega
  // { 
  //   path: 'watchlist-screening', 
  //   loadComponent: () => import('./modules/watchlist/watchlist').then(m => m.WatchlistComponent)
  //   // 💡 Note: Agar aap ka component normal import hai toh direct 'component: WatchlistComponent' bhi likh sakte hain
  // },

  // 4. Wildcard Route: Agar koi galat URL likhe toh login par phek do
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];