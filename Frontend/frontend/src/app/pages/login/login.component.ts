import {ChangeDetectionStrategy,Component, OnInit, signal, viewChild} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, FormsModule, ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LoginComponent implements OnInit{

  reactiveForm: FormGroup;
  ngOnInit() {
      this.reactiveForm = new FormGroup({
        fullname: new FormControl(null, Validators.required),
        
        password: new FormControl(null,Validators.required),
      });
  }


  hide1 = signal(true);
    clickEvent1(event: MouseEvent) {
      this.hide1.set(!this.hide1());
      event.stopPropagation();
    }

    formSubmitted() {
      console.log(this.reactiveForm);
    }
}
