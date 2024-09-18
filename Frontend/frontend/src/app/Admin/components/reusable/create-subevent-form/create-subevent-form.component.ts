import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
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
import { SubeventService } from '../../../services/subevent-service/subevent.service';
import { Subevent } from '../../../models/subevent.models';

@Component({
  selector: 'app-create-subevent-form',
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
  templateUrl: './create-subevent-form.component.html',
  styleUrl: './create-subevent-form.component.css'
})
export class CreateSubeventFormComponent {

  options: string[] = ['One', 'Two', 'Three'];


  filteredOptions: Observable<string[]>;
  eventForm: FormGroup;
  
  constructor(private subEventService: SubeventService) {


    
    this.eventForm = new FormGroup({
      subeventName: new FormControl(''),
      description: new FormControl(''),
      head: new FormControl(''),
      coHead: new FormControl(''),
      myControl: new FormControl(''),
    });
  }

  ngOnInit() {
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

    const newEvent: Subevent = {
      id: null,
      subpatrollingname: this.eventForm.value.eventName,
      description: this.eventForm.value.description,
      head: this.eventForm.value.headId,
      cohead: this.eventForm.value.headId,
      instructions: "",
      area: null,
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
      }
    });
  }
  
  readonly panelOpenState = signal(false);

  
}
