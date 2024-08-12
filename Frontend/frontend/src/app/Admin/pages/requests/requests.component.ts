import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request-service/request.service';
import { Request } from '../../models/request.model';
import { MatButtonModule } from '@angular/material/button';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [MatButtonModule, MatChipsModule, CommonModule],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {

  allRequests: Request[] = [];
  requests: Request[] = [];

  items = [
    { title: "All", active: true, index: 0 },
    { title: "Approved", active: false, index: 1 },
    { title: "Pending", active: false, index: 2 }
  ];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getRequests();
  }

  setActive(ind: number) {
    this.items.forEach((item, i) => {
      item.active = i === ind;
    });
    this.applyFilter();
  }

  applyFilter() {
    if (this.items[0].active) {
      this.requests = [...this.allRequests];
    } else if (this.items[1].active) {
      this.requests = this.allRequests.filter(item => item.status === "APPROVED");
    } else if (this.items[2].active) {
      this.requests = this.allRequests.filter(item => item.status !== "APPROVED");
    }
  }

  getRequests() {
    this.requestService.getRequests().subscribe(
      (data: Request[]) => {
        this.allRequests = data;
        this.applyFilter(); // Ensure the filter is applied to the initial data
      },
      error => {
        console.error("Error fetching requests:", error);
      }
    );
  }

  reject(request: Request) {
    this.requestService.rejectRequest(request).pipe(
      switchMap(() => this.requestService.getRequests()),
      catchError(error => {
        console.error("Error rejecting request:", error);
        return of([]);
      })
    ).subscribe((data: Request[]) => {
      this.allRequests = data;
      this.applyFilter();
    });
  }

  approve(request: Request) {
    this.requestService.approveRequest(request).pipe(
      switchMap(() => this.requestService.getRequests()),
      catchError(error => {
        console.error("Error approving request:", error);
        return of([]);
      })
    ).subscribe((data: Request[]) => {
      this.allRequests = data;
      this.applyFilter();
    });
  }
}
