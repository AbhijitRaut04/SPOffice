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
  FormBuilder,
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

  hide1 = true; // Initial state for password visibility

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      fullname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.reactiveForm.valid) {
      console.log('Form Submitted:', this.reactiveForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  togglePasswordVisibility() {
    this.hide1 = !this.hide1;
  }
}
