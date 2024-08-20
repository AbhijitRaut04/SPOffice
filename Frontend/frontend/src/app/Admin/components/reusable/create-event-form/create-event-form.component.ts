import { AsyncPipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-create-event-form',
  standalone: true,
  imports: [MatExpansionModule,
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
  styleUrl: './create-event-form.component.css'
})
export class CreateEventFormComponent {

  options: string[] = ['One', 'Two', 'Three'];
  @Input() eventObject: { id: string, name: string };


  filteredOptions: Observable<string[]>;
  eventForm: FormGroup;
  
  constructor() {
    
  }

  initializeForm() {
    console.log(this.eventObject);
    this.eventForm = new FormGroup({
      eventName: new FormControl(this.eventObject?.name),
      description: new FormControl(''),
      head: new FormControl(''),
      coHead: new FormControl(''),
      myControl: new FormControl(''),
    });
  }

  ngOnInit() {

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
