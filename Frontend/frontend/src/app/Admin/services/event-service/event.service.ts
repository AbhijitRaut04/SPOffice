import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Event } from '../../models/event.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${environment.baseUrl}/api/patrollings`;

  admin_id = 1;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.apiUrl}/admin/${this.admin_id}`);
  }

  addEvent(event: Event) {
    return this.http.post<Event>(this.apiUrl, event);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
