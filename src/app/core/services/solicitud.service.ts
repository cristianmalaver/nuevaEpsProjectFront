import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

    private apiUrl = 'http://localhost:8080/api/solicitudes';
    private apiMedicamentosUrl = 'http://localhost:8080/api/medicamentos';

  constructor(private http: HttpClient) {}

  obtenerSolicitudes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearSolicitud(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  eliminarSolicitud(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMedicamentos(): Observable<any> {
    return this.http.get(this.apiMedicamentosUrl);
  }

}