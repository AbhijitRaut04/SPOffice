import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = `${environment.baseUrl}/api/requests`;

  constructor(private http: HttpClient) { }


  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }

  rejectRequest(request: Request): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/reject-request/${request.id}`, {});
  }

  approveRequest(request: Request): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/approve-request/${request.id}`, {});
  }
}
