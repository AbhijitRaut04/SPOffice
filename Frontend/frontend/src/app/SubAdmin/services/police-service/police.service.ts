import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Police } from '../../models/police.models';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PoliceService {
  private apiUrl = `${environment.baseUrl}/api/polices`;
  private subadminId = 1;

  constructor(private http: HttpClient) {}

  registerPolice(police: Police): Observable<Police> {
    return this.http.post<Police>(`${this.apiUrl}`, police).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
