import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subadmin, Request } from '../../models/subadmin.model';

@Injectable({
  providedIn: 'root'
})
export class SubadminService {
  private apiUrl = `${environment.baseUrl}/api/subadmins`;

  admin_id = 1;

  constructor(private http: HttpClient) { 
    this.getValidSubadmins();
  }


  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests/${this.admin_id}`);
  }

  rejectRequest(request: Request): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/requests/reject/${request.id}`, {});
  }

  approveRequest(request: Request): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/requests/approve/${request.id}`, {});
  }

  getValidSubadmins(): any{
    return this.http.get<Subadmin[]>(`${this.apiUrl}/approved/${this.admin_id}`);
  }

}
