import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Subevent } from '../../models/subevent.models';

@Injectable({
  providedIn: 'root',
})
export class SubeventService {
  private apiUrl = `${environment.baseUrl}/api/sub-patrollings`;

  admin_id = 1;

  constructor(private http: HttpClient) {}

  getSubevents(): Observable<Subevent[]> {
    return this.http.get<Subevent[]>(`${this.apiUrl}/${this.admin_id}`);
  }

  addSubevents(subevent: Subevent) {
    return this.http.post<Subevent>(this.apiUrl, subevent);
  }

  updateSubevent(subevent: Subevent) {
    console.log(subevent);
    return this.http.put<Event>(`${this.apiUrl}/${subevent.id}`, subevent);
  }

  deleteSubevents(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
