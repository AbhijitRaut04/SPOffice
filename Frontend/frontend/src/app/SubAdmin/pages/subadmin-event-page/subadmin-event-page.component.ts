import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models/event.models';
import { DateFormatPipe } from '../../../pipes/date-format/date-format.pipe';
import { SubadminService } from '../../services/subadmin-service/subadmin.service';
import { CurrentSubadmin } from '../../models/subadmin.models';
import { Police } from '../../models/police.models';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import { EventService } from '../../services/event-service/event.service';

@Component({
  selector: 'app-subadmin-event-page',
  standalone: true,
  imports: [DateFormatPipe, MatCheckboxModule, MatListModule, FormsModule, ReactiveFormsModule],
  templateUrl: './subadmin-event-page.component.html',
  styleUrl: './subadmin-event-page.component.css'
})
export class SubadminEventPageComponent {
  event: Event;
  constructor(private eventService: EventService, private subadminService: SubadminService) { }

  subadmin: CurrentSubadmin;
  attendanceForm: FormGroup;

  submitted = false;
  showAttendanceForm:boolean;


  ngOnInit(): void {
    this.getCurrentSubadmin();

    this.attendanceForm = new FormGroup({
      id: new FormControl(),
      polices: new FormControl([], Validators.minLength(1)),
      patrollingId: new FormControl(),
      subadminId: new FormControl()
    })

    // console.log(this.subadmin)
    const eventFromState = history.state.event;
    if (eventFromState) {
      this.event = eventFromState;
    }
    // this.filterAttendance(this.subadmin?.polices, this.event.attendances?.polices);
    // console.log("Attendance",this.attendance);
  }

  submit(){
    this.attendanceForm.value.patrollingId = this.event.id;
    this.attendanceForm.value.subadminId = this.subadmin.id;
    if(this.attendanceForm.valid){
      this.eventService.sendAttendance(this.attendanceForm.value).subscribe(data => {
        console.log(data)
      })
    }
  }

  openAttendanceForm() {
    this.showAttendanceForm = true;
  }

  getCurrentSubadmin() {
    this.subadminService.fetchSubadmin().subscribe(data => {
      this.subadmin = data;
    })
  }


  filterAttendance(arr1: Police[], arr2: Police[]): void {
    arr1?.filter(police => {
      let flag = false;
      for (let police2 of arr2) {
        if (police.id === police2.id) {
          flag = true;
          break;
        }
      };
    })
  }
}
