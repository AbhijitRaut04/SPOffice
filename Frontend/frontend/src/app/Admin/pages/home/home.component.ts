import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  buttons = [
    {title: 'Sign up'},
    {title: 'Log in'},
    {title: 'Register Event'} 
   ]
   
  features = [
    {title: "Event Registration", description: "Quickly register your event by providing essential details such as date, time, location, and expected attendance."},
    {title: "Security Details", description: "Submit detailed security requirements, including the number of security personnel needed, access control measures, emergency response plans, and more."},
    {title: "Direct Contact", description: "Facilitate direct and real-time communication between event organizers and the SP office to address any concerns or updates."},
    {title: "Document Upload", description: "Easily upload and share necessary documents, such as permits, licenses, and security plans, with the SP office."},
    {title: "Status Tracking", description: "Monitor the status of your event submission and receive notifications about approvals, required changes, or additional information requests."},
    {title: "Feedback and Reports", description: "After the event, provide feedback on the security arrangements and report any incidents or issues encountered."}
];
}
