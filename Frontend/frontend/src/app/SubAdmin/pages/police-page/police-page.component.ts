import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
} from '@angular/core';
import { SubadminService } from '../../services/subadmin-service/subadmin.service';
import { CurrentSubadmin } from '../../models/subadmin.models';
import { NgFor } from '@angular/common';
import { Police } from '../../models/police.models';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-police-page',
  standalone: true,
  imports: [NgFor, MatExpansionModule,MatButtonModule, MatDividerModule, ],
  templateUrl: './police-page.component.html',
  styleUrls: ['./police-page.component.css'],
})
export class PolicePageComponent {
  // subadmin?: CurrentSubadmin;

  // constructor(private subadminService: SubadminService) { }

  // ngOnInit(): void {
  //   this.fetchSubadmin();
  // }

  // fetchSubadmin(): void {
  //   this.subadminService.fetchSubadmin().subscribe(
  //     (data: CurrentSubadmin) => {
  //       this.subadmin = data;
  //       console.log('Fetched Subadmin:', data);
  //     },
  //     (error) => {
  //       console.error('Error fetching subadmin:', error);
  //     }
  //   );
  // }

  // Toggle the collapse/expand state for all panels
  expandAll: boolean = false;
  toggleAllPanels() {
    this.expandAll = !this.expandAll;
  }

  readonly panelOpenState = signal(false);

  policeArray: Police[] = [
    {
      id: 1,
      fullname: 'John Doe',
      policeId: 123456,
      phone: '555-1234',
      email: 'john.doe@example.com',
      gender: 'Male',
      designation: 'Officer',
    },
    {
      id: 2,
      fullname: 'Jane Smith',
      policeId: 123457,
      phone: '555-5678',
      email: 'jane.smith@example.com',
      gender: 'Female',
      designation: 'Sergeant',
    },
    {
      id: 3,
      fullname: 'Alice Johnson',
      policeId: 123458,
      phone: '555-8765',
      email: 'alice.johnson@example.com',
      gender: 'Female',
      designation: 'Lieutenant',
    },
    {
      id: 4,
      fullname: 'Bob Brown',
      policeId: 123459,
      phone: '555-4321',
      email: 'bob.brown@example.com',
      gender: 'Male',
      designation: 'Captain',
    },
    {
      id: 5,
      fullname: 'Charlie Davis',
      policeId: 123460,
      phone: '555-6789',
      email: 'charlie.davis@example.com',
      gender: 'Male',
      designation: 'Detective',
    },
    {
      id: 6,
      fullname: 'Emily Wilson',
      policeId: 123461,
      phone: '555-9876',
      email: 'emily.wilson@example.com',
      gender: 'Female',
      designation: 'Officer',
    },
    {
      id: 7,
      fullname: 'Michael Martinez',
      policeId: 123462,
      phone: '555-3456',
      email: 'michael.martinez@example.com',
      gender: 'Male',
      designation: 'Sergeant',
    },
    {
      id: 8,
      fullname: 'Jessica Taylor',
      policeId: 123463,
      phone: '555-7890',
      email: 'jessica.taylor@example.com',
      gender: 'Female',
      designation: 'Lieutenant',
    },
    {
      id: 9,
      fullname: 'David Anderson',
      policeId: 123464,
      phone: '555-6543',
      email: 'david.anderson@example.com',
      gender: 'Male',
      designation: 'Captain',
    },
    {
      id: 10,
      fullname: 'Sophia Lee',
      policeId: 123465,
      phone: '555-3210',
      email: 'sophia.lee@example.com',
      gender: 'Female',
      designation: 'Detective',
    },
  ];
}
