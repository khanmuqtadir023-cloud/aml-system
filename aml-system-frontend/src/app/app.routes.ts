import { Routes } from '@angular/router';
import { Login } from '../app/components/login/login'; 
import { Signup } from '../app/components/signup/signup';
import { SidebarComponent } from './core/sidebar/sidebar';
import { DashboardComponent } from './modules/watchlist/dashboard/dashboard'; 
import { NewScreeningComponent } from './modules/new-screening/new-screening'; 
import { ScreeningResultsComponent } from './modules/watchlist/screening-results/screening-results'; 
import { MatchDetailsComponent } from './modules/watchlist/match-details/match-details';
import { MatchReviewComponent } from './modules/watchlist/match-review/match-review'; 
import { ScreeningHistoryComponent } from './modules/watchlist/screening-history/screening-history';


export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'watchlist-screening/dashboard', 
    pathMatch: 'full' 
  },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  { 
    path: 'watchlist-screening', 
    component: SidebarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'new-screening', component: NewScreeningComponent },
      { path: 'screening-results', component: ScreeningResultsComponent },
      { path: 'match-details', component: MatchDetailsComponent },
      
      // 👈 NEW ROUTE ADDED: Match Review
      { path: 'match-review', component: MatchReviewComponent },
      { path: 'screening-history', component: ScreeningHistoryComponent },
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'watchlist-screening/dashboard' }
];