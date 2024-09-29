import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { CreateSubeventFormComponent } from '../../../../components/reusable/create-subevent-form/create-subevent-form.component';
import { Police } from '../../../../models/police.models';
import { SubeventService } from '../../../../services/subevent-service/subevent.service';
import { Event } from '../../../../models/event.models';
import { Subevent } from '../../../../models/subevent.models';

@Component({
  selector: 'app-create-subevent',
  standalone: true,
  imports: [
    SidebarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BackBtnComponent,
    CreateSubeventFormComponent,
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
  templateUrl: './create-subevent.component.html',
  styleUrl: './create-subevent.component.css',
})
export class CreateSubeventComponent {
  polices: Police[] = [];

  filteredOptionsHead: Observable<Police[]>;
  filteredOptionsCohead: Observable<Police[]>;
  eventForm: FormGroup;
  event: Event;
  constructor(private subEventService: SubeventService) {
    this.eventForm = new FormGroup({
      subpatrollingname: new FormControl(''),
      description: new FormControl(''),
      instructions: new FormControl(''),
      head: new FormControl(''),
      cohead: new FormControl(''),
      patrollingId: new FormControl(''),
    });
  }

  displayPoliceName(option: Police): string {
    return option ? option.fullname : '';
  }

  getPolices() {
    Object.values(this.event.attendance).forEach((value) => {
      this.polices = [...value, ...this.polices];
    });
    this.filteredOptionsHead = this.eventForm.get('head')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.filteredOptionsCohead = this.eventForm
      .get('cohead')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
  }

  ngOnInit() {
    this.event = history.state.event;
    this.getPolices();
  }

  private _filter(value: string): Police[] {
    const filterValue = value.toLowerCase();

    return this.polices.filter((option) =>
      option.fullname.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    const newEvent: Subevent = {
      id: null,
      subpatrollingname: this.eventForm.value.subpatrollingname,
      description: this.eventForm.value.description,
      head: this.eventForm.value.head,
      cohead: this.eventForm.value.cohead,
      instructions: this.eventForm.value.instructions,
      patrollingId: this.event.id,
      areas: null,
    };

    this.subEventService.addSubevents(newEvent).subscribe({
      next: (response) => {
        console.log('Subevent created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating subevent:', error);
      },
      complete: () => {
        console.log('Subevent creation process completed.');
      },
    });
  }

  readonly panelOpenState = signal(false);
}
