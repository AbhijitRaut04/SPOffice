import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = `${environment.baseUrl}/api/subadmins`;

  admin_id = 2;

  constructor(private http: HttpClient) { }


  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests/${this.admin_id}`);
  }

  rejectRequest(request: Request): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/requests/reject/${request.id}`, {});
  }

  approveRequest(request: Request): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/requests/approve/${request.id}`, {});
  }
}
