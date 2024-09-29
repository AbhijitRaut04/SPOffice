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
  selector: 'app-edit-area',
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
  templateUrl: './edit-area.component.html',
  styleUrl: './edit-area.component.css',
})
export class EditAreaComponent implements OnInit {
  filteredOptionsHead: Observable<Police[]>;
  filteredOptionsCohead: Observable<Police[]>;

  polices: Police[] = [];

  areaForm: FormGroup;
  subevent: Subevent;
  event: Event;
  area: Area;

  constructor(private areaService: AreaService) {}

  initializeForm() {
    this.areaForm = new FormGroup({
      areaName: new FormControl(this.area.areaName),
      head: new FormControl(this.area.head),
      cohead: new FormControl(this.area.cohead),
      subPatrollingId: new FormControl(this.area.subPatrollingId),
    });
  }

  ngOnInit() {
    this.event = history.state.event;
    this.subevent = history.state.subevent;
    this.area = history.state.area;
    this.initializeForm();

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
