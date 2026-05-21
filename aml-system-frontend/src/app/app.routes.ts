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

// Transaction Components
import { TransactionListComponent } from './components/transaction-list/transaction-list'; 
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail'; 

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: '', redirectTo: 'watchlist-screening/dashboard', pathMatch: 'full' },
      
      // WATCHLIST SCREENING MODULE
      { 
        path: 'watchlist-screening', 
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'new-screening', component: NewScreeningComponent },
          { path: 'screening-results', component: ScreeningResultsComponent },
          { path: 'match-details', component: MatchDetailsComponent },
          { path: 'match-review', component: MatchReviewComponent },
          { path: 'screening-history', component: ScreeningHistoryComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },

      // TRANSACTION MONITORING MODULE
      {
        path: 'transactions',
        children: [
          { path: '', component: TransactionListComponent },
          { path: ':id', component: TransactionDetailComponent }
        ]
      }
    ]
  },

  { path: '**', redirectTo: 'watchlist-screening/dashboard' }
];