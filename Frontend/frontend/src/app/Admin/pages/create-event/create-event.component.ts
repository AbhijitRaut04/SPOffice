import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { map, Observable, startWith } from 'rxjs';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CreateBtnComponent } from '../../components/reusable/create-btn/create-btn.component';
import { CreateEventFormComponent } from '../../components/reusable/create-event-form/create-event-form.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    SidebarComponent,
    CreateBtnComponent,
    CreateEventFormComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEventComponent {
  // eventName = '';
  // description = '';
  // head = '';
  // coHead = '';
  options: string[] = ['One', 'Two', 'Three'];

  filteredOptions: Observable<string[]>;
  eventForm: FormGroup;

  constructor() {
    this.eventForm = new FormGroup({
      eventName: new FormControl(''),
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

  createEvent() {
    
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
