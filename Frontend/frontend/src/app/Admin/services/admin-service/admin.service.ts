import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../../models/admin.models';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = `${environment.baseUrl}/api/admins`;

  constructor(private http: HttpClient) {}

  registerAdmin(admin: Admin) {
    console.log('form submitted', admin);
    return this.http.post<Admin>(this.apiUrl, admin);
  }
}
