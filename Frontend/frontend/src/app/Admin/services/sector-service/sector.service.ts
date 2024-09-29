import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Sector } from '../../models/sector.models';

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  private apiUrl = `${environment.baseUrl}/api/sectors`;

  constructor(private http: HttpClient) {}

  addSector(sector: Sector) {
    console.log(sector);
    return this.http.post<Sector>(this.apiUrl, sector);
  }
}
