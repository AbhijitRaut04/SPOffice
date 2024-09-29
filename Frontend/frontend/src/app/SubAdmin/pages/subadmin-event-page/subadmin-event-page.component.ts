import { Component } from '@angular/core';
import { Attendance, Event } from '../../models/event.models';
import { DateFormatPipe } from '../../../pipes/date-format/date-format.pipe';
import { SubadminService } from '../../services/subadmin-service/subadmin.service';
import { CurrentSubadmin, Subadmin } from '../../models/subadmin.models';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { EventService } from '../../services/event-service/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subadmin-event-page',
  standalone: true,
  imports: [
    DateFormatPipe,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './subadmin-event-page.component.html',
  styleUrl: './subadmin-event-page.component.css',
})
export class SubadminEventPageComponent {
  event: Event;
  constructor(
    private eventService: EventService,
    private subadminService: SubadminService,
    private _snackBar: MatSnackBar
  ) {}

  subadmin: CurrentSubadmin;
  attendanceForm: FormGroup;

  submitted: boolean = false;
  showAttendanceForm: boolean;

  ngOnInit(): void {
    const eventFromState = history.state.event;
    if (eventFromState) {
      this.event = eventFromState;
    }
    console.log(this.event);
    this.getCurrentSubadmin();

    this.attendanceForm = new FormGroup({
      id: new FormControl(),
      polices: new FormControl([], Validators.minLength(1)),
      patrollingId: new FormControl(),
      subadminId: new FormControl(),
    });

    // console.log("Attendance",this.attendance);
  }

  submit() {
    this.attendanceForm.value.patrollingId = this.event.id;
    this.attendanceForm.value.subadminId = this.subadmin.id;
    if (this.attendanceForm.valid) {
      this.eventService
        .sendAttendance(this.attendanceForm.value)
        .subscribe((data) => {
          console.log(data);
          this._snackBar.open('Attendance Submitted Successfully', 'OK', {
            duration: 3000,
          });
        });
    }
  }

  openAttendanceForm() {
    this.showAttendanceForm = true;
  }

  getCurrentSubadmin() {
    this.subadminService.fetchSubadmin().subscribe((data) => {
      this.subadmin = data;
      this.filterAttendance(this.subadmin, this.event.attendance);
    });
  }

  filterAttendance(subadmin: Subadmin, arr: Attendance[]): void {
    arr.forEach((item) => {
      if (item.subadmin?.id?.toString() === subadmin?.id?.toString()) {
        this.submitted = true;
      }
    });
  }
}
