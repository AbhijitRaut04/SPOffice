import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Location } from '../../models/location.models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = `${environment.baseUrl}/api/locations`;

  constructor(private http: HttpClient) { }

  addLocation(location: Location) {
    console.log(location)
    return this.http.post<Location>(this.apiUrl, location);
  }
}
