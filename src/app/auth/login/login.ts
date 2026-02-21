import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

 errorMessage = '';
  loading = false;

  form: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 onSubmit() {

    if (this.form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.form.value).subscribe({
      next: (token: string) => {

        // Guardar token
        localStorage.setItem('token', token);

        // Redirigir a lista solicitudes
        this.router.navigate(['/solicitudes']);

      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas';
        this.loading = false;
      }
    });
  }
}