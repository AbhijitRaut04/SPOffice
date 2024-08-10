import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Event } from '../../models/event.models';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${environment.baseUrl}/api/admins`;

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<Event[]>(this.apiUrl);
  }

  addEvent(event: Event) {
    return this.http.post<Event>(this.apiUrl, event);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
