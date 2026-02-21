import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {

  errorMessage = '';

  form!: any;

constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router
) {
  this.form = this.fb.group({
    username: ['', Validators.required],
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    rol: ['USER', Validators.required]
  });
}

  onSubmit() {
 console.log('SI ESTA ENTRANDO');
    if (this.form.invalid) return;

    this.authService.register(this.form.value).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Error al registrar';
      }
    });
  }
}