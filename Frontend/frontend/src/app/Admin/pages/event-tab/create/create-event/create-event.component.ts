import { Component, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CreateBtnComponent } from '../../../../components/reusable/create-btn/create-btn.component';
import { CreateEventFormComponent } from '../../../../components/reusable/create-event-form/create-event-form.component';
import { CreateSubeventFormComponent } from '../../../../components/reusable/create-subevent-form/create-subevent-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { Event } from '../../../../models/event.models';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { map, Observable, startWith } from 'rxjs';

interface EventObject {
  id: string;
  name: string;
  // Add other properties as needed
}

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
  constructor(private router: Router, private route: ActivatedRoute) { }
  // event: Event;
  eventForm:FormGroup;

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  initializeForm() {
    this.eventForm = new FormGroup({
      eventname: new FormControl(''),
      description: new FormControl(''),
      head: new FormControl(''),
      cohead: new FormControl(''),
      date: new FormControl('')
    });
  }

  ngOnInit(){
    // this.route.queryParams.subscribe(params => {
    //   this.event = history.state.event;
    // });
    this.initializeForm();
    
    this.filteredOptions = this.eventForm.get('head')!.valueChanges.pipe(
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
    console.log(this.eventForm.value);
  }
  
  readonly panelOpenState = signal(false);
}

