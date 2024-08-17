import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models/event.models';
import { DateFormatPipe } from '../../../pipes/date-format/date-format.pipe';
import { SubadminService } from '../../services/subadmin-service/subadmin.service';
import { CurrentSubadmin } from '../../models/subadmin.models';
import { Police } from '../../models/police.models';

@Component({
  selector: 'app-subadmin-event-page',
  standalone: true,
  imports: [DateFormatPipe],
  templateUrl: './subadmin-event-page.component.html',
  styleUrl: './subadmin-event-page.component.css'
})
export class SubadminEventPageComponent {
  event: Event;
  constructor(private route: ActivatedRoute, private subadminService: SubadminService) { }

  subadmin:CurrentSubadmin;
  attendance:[];

  submitted = false;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const eventFromState = history.state.event;
      if (eventFromState) {
        this.event = eventFromState;
        console.log(this.event);
      }
    });
    this.filterAttendance(this.subadmin?.polices, this.event.attendances?.polices);
    console.log("Attendance",this.attendance);
  }

  filterAttendance(arr1:Police[], arr2:Police[]):void{
    arr1?.filter(police => {
      let flag = false;
      for(let police2 of arr2){
        if(police.id === police2.id){
          flag = true;
          break;
        }
      };
    })
  }
}
