import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-app-subadmin',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app-subadmin.component.html',
  styleUrl: './app-subadmin.component.css'
})
export class AppSubadminComponent {

}
