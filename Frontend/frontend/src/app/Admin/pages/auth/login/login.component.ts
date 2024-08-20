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
import { AuthService } from '../../../services/admin-auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        username: new FormControl(null, Validators.required),
        
        password: new FormControl(null,Validators.required),
      });
  }

  hide1 = true; // Initial state for password visibility

  constructor(private fb: FormBuilder, private authService:AuthService, private _snackBar: MatSnackBar) {
    this.reactiveForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.reactiveForm.valid) {
      this.authService.login(this.reactiveForm.value);
      this._snackBar.open("User Logged In", "OK",
        {
          duration:5000
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  togglePasswordVisibility() {
    this.hide1 = !this.hide1;
  }
}
