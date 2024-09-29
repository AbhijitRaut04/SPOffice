import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Sector } from '../../../../models/sector.models';
import { SectorService } from '../../../../services/sector-service/sector.service';
import { Subevent } from '../../../../models/subevent.models';
import { map, Observable, startWith } from 'rxjs';
import { Police } from '../../../../models/police.models';
import { Event } from '../../../../models/event.models';
import { Area } from '../../../../models/area.models';

@Component({
  selector: 'app-edit-sector',
  standalone: true,
  imports: [
    SidebarComponent,
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
    MatButtonModule,
  ],
  templateUrl: './edit-sector.component.html',
  styleUrl: './edit-sector.component.css',
})
export class EditSectorComponent {
  filteredOptionsHead: Observable<Police[]>;
  filteredOptionsCohead: Observable<Police[]>;

  polices: Police[] = [];

  sectorForm: FormGroup;
  area: Area;
  event: Event;
  sector: Sector;

  constructor(private sectorService: SectorService) {}

  initializeForm() {
    this.sectorForm = new FormGroup({
      sectorName: new FormControl(),
      head: new FormControl(''),
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.event = history.state.event;
    this.area = history.state.area;
    this.sector = history.state.sector;
    console.log(this.event);
    this.filteredOptionsHead = this.sectorForm.get('head')!.valueChanges.pipe(
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
    this.filteredOptionsHead = this.sectorForm.get('head')!.valueChanges.pipe(
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
    const newSector: Sector = {
      id: null,
      sectorName: this.sectorForm.value.sectorName,
      head: this.sectorForm.value.head,
      locations: null,
      area: this.area,
    };

    this.sectorService.addSector(newSector).subscribe({
      next: (response) => {
        console.log('Sector created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating sector:', error);
      },
      complete: () => {
        console.log('Sector creation process completed.');
      },
    });
  }
}
