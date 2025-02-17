import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [NgIf, FormsModule],
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  error = signal('');

  constructor(private api: ApiService, private router: Router) {}

  submit() {
    this.error.set('');
    this.api.login(this.email(), this.password()).subscribe({
      next: (res) => {
        if (res.token) {
          this.api.saveToken(res.token);
          this.router.navigate(['/schedule']);
        }
      },
      error: () => this.error.set('Неверные данные'),
    });
  }
}
