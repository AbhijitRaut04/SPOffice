import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CurrentSubadmin, Subadmin } from '../../models/subadmin.models';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubadminService {

  private apiUrl = `${environment.baseUrl}/api/subadmins`;
  private subadminId = 1;

  constructor(private http: HttpClient) { }

  fetchSubadmin(): Observable<CurrentSubadmin> {
    return this.http.get<CurrentSubadmin>(`${this.apiUrl}/${this.subadminId}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  registerSubadmin(subadmin: Subadmin): Observable<Subadmin> {
    return this.http.post<Subadmin>(`${this.apiUrl}?admin_id=${subadmin.admin_id}`, subadmin).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
