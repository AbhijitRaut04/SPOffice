import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { Event } from '../../../models/event.models';
import { EventService } from '../../../services/event-service/event.service';

@Component({
  selector: 'app-create-event-form',
  standalone: true,
  imports: [
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
  templateUrl: './create-event-form.component.html',
  styleUrl: './create-event-form.component.css',
})
export class CreateEventFormComponent implements OnInit {
  options: string[] = ['One', 'Two', 'Three'];
  @Input() event: Event;

  admin_id: number = 1;

  filteredOptionsHead: Observable<string[]>;

  eventForm: FormGroup;

  constructor(private eventService: EventService) {}

  initializeForm() {
    this.eventForm = new FormGroup({
      eventName: new FormControl(this.event?.eventname),
      description: new FormControl(''),
      head: new FormControl(''),
      cohead: new FormControl(''),
      date: new FormControl(''),
    });
  }

  ngOnInit() {
    this.initializeForm();

    this.filteredOptionsHead = this.eventForm.get('head')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    const newEvent: Event = {
      id: null,
      adminId: this.admin_id,
      eventname: this.eventForm.value.eventName,
      description: this.eventForm.value.description,
      head: this.eventForm.value.head,
      cohead: this.eventForm.value.cohead,
      date: this.eventForm.value.date,
      subpatrollings: null,
    };

    this.eventService.addEvent(newEvent).subscribe({
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

  // readonly panelOpenState = signal(false);
}
