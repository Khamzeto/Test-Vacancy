import { Routes } from '@angular/router';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
];
