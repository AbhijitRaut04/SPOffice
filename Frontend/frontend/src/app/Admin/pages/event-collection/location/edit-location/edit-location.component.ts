import { Component } from '@angular/core';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Sector } from '../../../../models/sector.models';
import { Event } from '../../../../models/event.models';
import { map, Observable, startWith } from 'rxjs';
import { Police } from '../../../../models/police.models';
import { LocationService } from '../../../../services/location-service/location.service';
import { Location } from '../../../../models/location.models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-location',
  standalone: true,
  imports: [
    BackBtnComponent,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    AsyncPipe,
    SidebarComponent,
    MatExpansionModule,
    MatButtonModule,
  ],
  templateUrl: './edit-location.component.html',
  styleUrl: './edit-location.component.css',
})
export class EditLocationComponent {
  filteredOptionsHead: Observable<Police[]>;
  filteredOptionsCohead: Observable<Police[]>;

  equipments: string[][] = [['Barricade'], ['Pipes'], ['Car Blocker']];

  polices: Police[] = [];

  locationForm: FormGroup;
  location: Location;
  event: Event;
  sector: Sector;

  constructor(private locationService: LocationService) {}

  initializeForm() {
    this.locationForm = new FormGroup({
      locationName: new FormControl(this.location.locationName),
      head: new FormControl(this.location.head),
      equipments: new FormControl(this.location.equipments),
    });
  }

  ngOnInit() {
    this.event = history.state.event;
    this.sector = history.state.sector;
    this.location = history.state.location;
    this.initializeForm();
    this.filteredOptionsHead = this.locationForm.get('head')!.valueChanges.pipe(
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
    this.filteredOptionsHead = this.locationForm.get('head')!.valueChanges.pipe(
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
    const newLocation: Location = {
      id: null,
      locationName: this.locationForm.value.locationName,
      head: this.locationForm.value.head,
      headId: this.locationForm.value.head.id,
      sectorId: this.sector.id,
      equipments: this.locationForm.value.equipments,
      polices: [],
      policeIds: null
    };

    this.locationService.addLocation(newLocation).subscribe({
      next: (response) => {
        console.log('Location created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating location:', error);
      },
      complete: () => {
        console.log('Location creation process completed.');
      },
    });
  }
}
