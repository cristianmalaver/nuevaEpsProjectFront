import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { SolicitudesListComponent } from './solicitudes/solicitud-list/solicitud-list';
import { authGuard } from './core/guards/auth-guard';
import { SolicitudFormComponent } from './solicitudes/solicitud-form/solicitud-form';

export const routes: Routes = [

  { path: '', redirectTo: 'register', pathMatch: 'full' },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

   {
    path: 'solicitudes',
    canActivate: [authGuard],
    children: [
      { path: '', component: SolicitudesListComponent },
      { path: 'nueva', component: SolicitudFormComponent }
    ]
  },

  { path: '**', redirectTo: 'register' }
];