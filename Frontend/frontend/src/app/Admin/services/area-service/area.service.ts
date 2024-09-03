import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Area } from '../../models/area.models';


@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = `${environment.baseUrl}/api/areas`;

  admin_id = 1;

  constructor(private http: HttpClient) { }

  getAreas(): Observable<Area[]>{
    return this.http.get<Area[]>(`${this.apiUrl}/${this.admin_id}`);
  }
}
