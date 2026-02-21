import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

register(data: any) {
  return this.http.post(
    `${this.apiUrl}/register`,
    data,
    { responseType: 'text' } 
  );
}

  login(data: any) {
    return this.http.post(
      `${this.apiUrl}/login`,
      data,
      { responseType: 'text' } 
    );
  }

}