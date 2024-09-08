import { Component, Input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Event } from '../../models/event.models';
import { Subadmin } from '../../../SubAdmin/models/subadmin.models';
import { AsyncPipe } from '@angular/common';
import { Police } from '../../models/police.models';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, MatExpansionModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
  
  @Input() event: Event;

  attendance:Pair[] = [];

  ngOnInit() {
    Object.entries(this.event.attendance).forEach(item => {
      
      const str = item[0];
      const regex = /(\w+)='([^']*)'/g;
      const result: { [key: string]: string } = {};
      let match = /(\w+)=([0-9]*)/.exec(str);
      result[match[1]] = match[2];
      
      while ((match = regex.exec(str)) !== null) {
        result[match[1]] = match[2];
      }
      let subadmin = new Subadmin(result);
      let polices = item[1]
  
      this.attendance.push(new Pair(subadmin, polices));
    });
    
  }
  readonly panelOpenState = signal(false);
}


export class Pair{
  subadmin:Subadmin;
  polices:[Police];
  constructor(subadmin:Subadmin, polices:[Police]){
    this.subadmin = subadmin;
    this.polices = polices;
  }
}

