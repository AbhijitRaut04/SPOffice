import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Police } from '../../models/police.models';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PoliceService {
  private apiUrl: string = `${environment.baseUrl}/api/polices`;
  constructor(private http: HttpClient) {}

  getAllPolices(): Observable<Police[]> {
    return this.http.get<Police[]>(this.apiUrl);
  }
}
