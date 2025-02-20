import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  imports: [NgFor, FormsModule],
})
export class ScheduleComponent implements OnInit {
  schedule = signal<Record<string, { start: string; end: string }>>({});
  days = signal<string[]>([]);
  isSaving = signal<boolean>(false);

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.getSchedule().subscribe({
      next: (data: Record<string, string>) => {
        const formatted: Record<string, { start: string; end: string }> = {};
        Object.keys(data).forEach((day) => {
          let [start, end] = data[day].split('-');
          if (end === '24:00') {
            end = '23:59';
          }
          formatted[day] = { start, end };
        });
        this.schedule.set(formatted);
        this.days.set(Object.keys(formatted));
      },
      error: () => alert('Ошибка загрузки расписания'),
    });
  }

  save(callback?: () => void) {
    this.isSaving.set(true);
    const updated: Record<string, string> = {};
    for (const day of this.days()) {
      let { start, end } = this.schedule()[day];
      if (end === '23:59') {
        end = '24:00';
      }
      updated[day] = `${start}-${end}`;
    }

    this.api.updateSchedule(updated).subscribe({
      next: () => {
        this.isSaving.set(false);
        alert('✅ Расписание сохранено!');
        if (callback) callback();
      },
      error: () => {
        this.isSaving.set(false);
        alert('❌ Ошибка сохранения расписания');
      },
    });
  }

  checkAccessNow() {
    this.save(() => {
      this.api.checkAccess().subscribe({
        next: (res: any) => alert(res.message),
        error: (err) => alert(err.error?.message || 'Ошибка проверки доступа'),
      });
    });
  }

  logout() {
    this.api.logout();
    this.router.navigate(['/login']); // Перенаправляем на страницу входа
  }
}
