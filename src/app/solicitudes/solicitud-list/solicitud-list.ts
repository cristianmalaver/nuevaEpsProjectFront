import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solicitudes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-list.html',
  styleUrls: ['./solicitud-list.scss']
})
export class SolicitudesListComponent implements OnInit {

  solicitudes: any[] = [];

  loading = true;
  errorMessage = '';

  currentPage = 0;
  pageSize = 2;
  totalPages = 0;
  totalElements = 0;

  pageNumbers: number[] = [];

  private apiUrl = 'http://localhost:8080/api/solicitudes';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSolicitudes();
  }

  getSolicitudes() {

    const token = localStorage.getItem('token');
    this.loading = true;

    this.http.get<any>(
      `${this.apiUrl}?page=${this.currentPage}&size=${this.pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: (response) => {
        this.solicitudes = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;

        this.pageNumbers = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar solicitudes';
        this.loading = false;
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getSolicitudes();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getSolicitudes();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getSolicitudes();
    }
  }

  changePageSize(event: any) {
    this.pageSize = Number(event.target.value);
    this.currentPage = 0;
    this.getSolicitudes();
  }

 logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

nuevaSolicitud() {
  this.router.navigate(['/solicitudes/nueva']);
}
}