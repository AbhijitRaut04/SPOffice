import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/subadmin-auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    NgClass,
    RouterLink,
  ],
  templateUrl: './subadmin-login.component.html',
  styleUrl: './subadmin-login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubadminLoginComponent implements OnInit {
  constructor(
    private router: Router,
    public authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  reactiveForm: FormGroup;
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      username: new FormControl(null, Validators.required),

      password: new FormControl(null, Validators.required),
    });
  }

  hide1 = signal(true);
  clickEvent1(event: MouseEvent) {
    this.hide1.set(!this.hide1());
    event.stopPropagation();
  }

  login() {
    if (this.reactiveForm.valid) {
      this.authService.login(this.reactiveForm.value);
      this.router.navigate(['/subadmin']);
      this._snackBar.open('Subadmin Logged In', 'OK', {
        duration: 3000,
      });
    } else {
      this._snackBar.open('Please enter valid credentials', 'OK');
    }
  }
}
