import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SubadminService } from '../../services/subadmin-service/subadmin.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sub-admin-signup',
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
  ],
  templateUrl: './sub-admin-signup.component.html',
  styleUrl: './sub-admin-signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubAdminSignupComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  constructor(
    private router: Router,
    private subadminService: SubadminService,
    private _snackBar: MatSnackBar
  ) {}

  // Details in Form with Validators
  reactiveForm: FormGroup;
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      admin_id: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      station: new FormControl(null, [
        Validators.required,
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
  }

  //Designation for Police
  designationOptions: string[] = [
    'Director General of Police (DGP)',
    'Additional Director General of Police (ADGP)',
    'Inspector General of Police (IGP)',
    'Deputy Inspector General of Police (DIG)',
    'Superintendent of Police (SP)',
    'Senior Superintendent of Police (SSP)',
    'Assistant Superintendent of Police (ASP)',
    'Deputy Superintendent of Police (DSP)',
    'Inspector of Police',
    'Sub-Inspector of Police (SI)',
    'Assistant Sub-Inspector of Police (ASI)',
    'Head Constable',
    'Police Constable',
  ];

  //Password Hide Button
  hide1 = signal(true);
  clickEvent1(event: MouseEvent) {
    this.hide1.set(!this.hide1());
    event.stopPropagation();
  }

  //Confirm Password hide button
  hide2 = signal(true);
  clickEvent2(event: MouseEvent) {
    this.hide2.set(!this.hide2());
    event.stopPropagation();
  }

  // Submitting Form
  submit() {
    if (this.reactiveForm.invalid) {
      this.openDialog('200ms', '200ms');
    } else {
      this.subadminService
        .registerSubadmin(this.reactiveForm.value)
        .subscribe((data) => {
          console.log(data);
        });
      // new AuthService().login("subadmin","subadmin");
      // this.router.navigate(['/subadmin/']);
      this._snackBar.open('Subadmin registered Successfully', 'OK');
    }
  }
}

@Component({
  selector: 'dialog-animations-example',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
}
