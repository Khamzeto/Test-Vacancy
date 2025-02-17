import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private api = inject(ApiService);
  private router = inject(Router);

  canActivate() {
    if (!this.api.token()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
