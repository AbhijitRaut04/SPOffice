import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Event } from '../../models/event.models';
import { Observable } from 'rxjs';
import { Subevent } from '../../models/subevent.models';

@Injectable({
  providedIn: 'root'
})
export class SubeventService {
  private apiUrl = `${environment.baseUrl}/api/patrollings`;

  admin_id = 1;

  constructor(private http: HttpClient) { }

  getSubevents(): Observable<Subevent[]>{
    return this.http.get<Subevent[]>(`${this.apiUrl}/admin/${this.admin_id}`);
  }

  addSubevents(subevent: Subevent) {
    return this.http.post<Subevent>(this.apiUrl, subevent);
  }

  deleteSubevents(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

// {
//   "headId": 0,
//   "coheadId": 0,
//   "description": "",
//   "instructions": "",
//   "patrollingId": 0
// }