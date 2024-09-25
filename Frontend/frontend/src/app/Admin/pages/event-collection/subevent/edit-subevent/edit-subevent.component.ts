import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
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
  selector: 'app-edit-subevent',
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
  templateUrl: './edit-subevent.component.html',
  styleUrl: './edit-subevent.component.css',
})
export class EditSubeventComponent implements OnInit  {
  polices: Police[] = [];
  event: Event;
  subevent: Subevent;
  subeventForm: FormGroup;

  filteredOptionsHead: Observable<Police[]>;
  filteredOptionsCohead: Observable<Police[]>;

  constructor(private subEventService: SubeventService) {}

  initializeForm() {
    this.subeventForm = new FormGroup({
      subpatrollingname: new FormControl(this.subevent.subpatrollingname, Validators.required),
      description: new FormControl(this.subevent.description, Validators.required),
      instructions: new FormControl(this.subevent.instructions, Validators.required),
      head: new FormControl(this.subevent.head, Validators.required),
      cohead: new FormControl(this.subevent.cohead, Validators.required),
      patrollingId: new FormControl(this.subevent.patrollingId, Validators.required),
    });
  }
  
  ngOnInit() {
    this.event = history.state.event;
    this.subevent = history.state.subevent;
    this.initializeForm();
    this.getPolices();
  }
  
  displayPoliceName(option: Police): string {
    return option ? option.fullname : '';
  }

  getPolices() {
    Object.values(this.event.attendance).forEach((value) => {
      this.polices = [...value, ...this.polices];
    });
    this.filteredOptionsHead = this.subeventForm.get('head')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.filteredOptionsCohead = this.subeventForm
      .get('cohead')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
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
      subpatrollingname: this.subeventForm.value.subpatrollingname,
      description: this.subeventForm.value.description,
      head: this.subeventForm.value.head,
      cohead: this.subeventForm.value.cohead,
      instructions: this.subeventForm.value.instructions,
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
