import { Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { CreateBtnComponent } from '../../../../components/reusable/create-btn/create-btn.component';
import { CreateEventFormComponent } from '../../../../components/reusable/create-event-form/create-event-form.component';
import { CreateSubeventFormComponent } from '../../../../components/reusable/create-subevent-form/create-subevent-form.component';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { Police } from '../../../../models/police.models';
import { EventService } from '../../../../services/event-service/event.service';
import { PoliceService } from '../../../../services/police-service/police.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    SidebarComponent,
    CreateBtnComponent,
    CreateEventFormComponent,
    CreateSubeventFormComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BackBtnComponent,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatDatepickerModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatDatepickerModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEventComponent implements OnInit {
  polices: Police[];
  // @Input() event: Event;

  // admin_id: number = 1;

  filteredOptionsHead: Observable<Police[]>;
  filteredOptionsCohead: Observable<Police[]>;

  eventForm: FormGroup;

  constructor(
    private eventService: EventService,
    private policeService: PoliceService
  ) {}

  initializeForm() {
    this.eventForm = new FormGroup({
      eventname: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      head: new FormControl('', Validators.required),
      cohead: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.getPolices();
  }

  private _filter(value: string): Police[] {
    if (!this.polices) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.polices.filter((option) =>
      option.fullname.toLowerCase().includes(filterValue)
    );
  }

  displayPoliceName(option: Police): string {
    return option ? option.fullname : '';
  }

  getPolices() {
    this.policeService
      .getAllPolices()
      .pipe(
        switchMap(() => this.policeService.getAllPolices()),
        catchError((error) => {
          console.error('Error fetching polices:', error);
          return of([]);
        })
      )
      .subscribe((data: Police[]) => {
        this.polices = data;
        console.log(this.polices);

        this.filteredOptionsHead = this.eventForm
          .get('head')!
          .valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
          );
        this.filteredOptionsCohead = this.eventForm
          .get('cohead')!
          .valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
          );
      });
  }

  onSubmit() {
    if (this.eventForm.invalid) return;
    // const newEvent: Event = {
    //   id: null,
    //   adminId: null,
    //   eventname: this.eventForm.value.eventname,
    //   description: this.eventForm.value.description,
    //   head: this.eventForm.value.head,
    //   cohead: this.eventForm.value.cohead,
    //   date: this.eventForm.value.date,
    //   subpatrollings: null,
    // };

    this.eventService.addEvent(this.eventForm.value).subscribe({
      next: (response) => {
        console.log('Event created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating event:', error);
      },
      complete: () => {
        console.log('Event creation process completed.');
      },
    });
  }
}
