import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { AsyncPipe } from '@angular/common';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { Police } from '../../../../models/police.models';
import { Subevent } from '../../../../models/subevent.models';
import { AreaService } from '../../../../services/area-service/area.service';
import { Area } from '../../../../models/area.models';
import { Event } from '../../../../models/event.models';

@Component({
  selector: 'app-create-area',
  standalone: true,
  imports: [
    SidebarComponent,
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
  ],
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.css',
})
export class CreateAreaComponent implements OnInit {
  filteredOptionsHead: Observable<Police[]>;
  filteredOptionsCohead: Observable<Police[]>;

  polices: Police[] = [];

  areaForm: FormGroup;
  subevent: Subevent;
  event: Event;

  constructor(private areaService: AreaService) {}

  initializeForm() {
    this.areaForm = new FormGroup({
      areaName: new FormControl(),
      head: new FormControl(''),
      cohead: new FormControl(''),
      subPatrollingId: new FormControl(''),
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.event = history.state.event;
    this.subevent = history.state.subevent;
    console.log(this.event);
    this.filteredOptionsHead = this.areaForm.get('head')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.filteredOptionsHead = this.areaForm.get('cohead')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.getPolices();
  }

  displayPoliceName(option: Police): string {
    return option ? option.fullname : '';
  }

  getPolices() {
    Object.values(this.event.attendance).forEach((value) => {
      this.polices = [...value, ...this.polices];
    });
    this.filteredOptionsHead = this.areaForm.get('head')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.filteredOptionsCohead = this.areaForm.get('cohead')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Police[] {
    const filterValue = value.toLowerCase();

    return this.polices.filter((police) =>
      police.fullname.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    const newArea: Area = {
      id: null,
      areaName: this.areaForm.value.areaName,
      headId: this.areaForm.value.head.id,
      coheadId: this.areaForm.value.cohead.id,
      subPatrollingId: this.subevent.id,
      head: null,
      cohead: null,
      sectors: null,
    };

    this.areaService.addArea(newArea).subscribe({
      next: (response) => {
        console.log('Area created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating area:', error);
      },
      complete: () => {
        console.log('Area creation process completed.');
      },
    });
  }
}
