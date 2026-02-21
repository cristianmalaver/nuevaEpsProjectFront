import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudesService } from '../../core/services/solicitud.service';

@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-form.html',
  styleUrls: ['./solicitud-form.scss']
})
export class SolicitudFormComponent implements OnInit {

  form: any;
  medicamentos: any[] = [];
  showNoPosMessage = false;
  errorMessage = '';
  successMessage = '';

  private fb = inject(FormBuilder);
  private solicitudesService = inject(SolicitudesService);
  private router = inject(Router);

  ngOnInit(): void {
    // Inicializamos el formulario con todos los controles
    this.form = this.fb.group({
      medicamento: [null, Validators.required],
      usuarioId: [1], // Ajusta según usuario logueado
      numeroOrden: [''],
      direccion: [''],
      telefono: [''],
      correo: ['']
    });

    // Primero cargamos los medicamentos
    this.solicitudesService.getMedicamentos().subscribe({
      next: (meds) => {
        this.medicamentos = meds;

        // Ahora que ya tenemos medicamentos, nos suscribimos a cambios
       this.form.get('medicamento')?.valueChanges.subscribe((medId: any) => {
  const selected = this.medicamentos.find(m => m.id === +medId); // <-- el + convierte a número
  this.showNoPosMessage = selected ? !selected.esPos : false;

  console.log('Medicamento seleccionado:', selected);
  console.log('Mostrar mensaje NO POS:', this.showNoPosMessage);

  // Limpiar campos NO POS si es POS
  if (!this.showNoPosMessage) {
    this.form.get('numeroOrden')?.setValue('');
    this.form.get('direccion')?.setValue('');
    this.form.get('telefono')?.setValue('');
    this.form.get('correo')?.setValue('');
  }
});
      },
      error: (err) => {
        console.error('Error al cargar medicamentos', err);
        this.errorMessage = 'Error al cargar los medicamentos';
      }
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const medId = this.form.get('medicamento')?.value;
   const selected = this.medicamentos.find(m => m.id === +medId);

    // JSON según POS o NO POS
    let payload: any = {
      usuarioId: this.form.get('usuarioId')?.value,
      medicamentoId: medId
    };


      console.log('Payload 1 a enviar:', payload);

    if (selected && !selected.esPos) {
      payload.numeroOrden = this.form.get('numeroOrden')?.value;
      payload.direccion = this.form.get('direccion')?.value;
      payload.telefono = this.form.get('telefono')?.value;
      payload.correo = this.form.get('correo')?.value;
    }

    
      console.log('Payload 2 a enviar:', payload);

    this.solicitudesService.crearSolicitud(payload).subscribe({
      next: () => {
        this.successMessage = 'Solicitud creada correctamente';
        setTimeout(() => this.router.navigate(['/solicitudes']), 1200);
      },
      error: () => this.errorMessage = 'Error al crear la solicitud'
    });
  }

  cancelar() {
    this.router.navigate(['/solicitudes']);
  }

}