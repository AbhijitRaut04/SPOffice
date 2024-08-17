import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-app-admin',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app-admin.component.html',
  styleUrl: './app-admin.component.css'
})
export class AppAdminComponent {

}
