import { ChangeDetectionStrategy, Component, inject, OnInit, signal, viewChild } from '@angular/core';
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
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PoliceService } from '../../services/police-service/police.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, FormsModule, ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './police-signup.component.html',
  styleUrl: './police-signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PoliceSignupComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  constructor(private router: Router, private policeService: PoliceService, private _snackBar: MatSnackBar) {

  }

  // Details in Form with Validators 
  reactiveForm: FormGroup;
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      fullname: new FormControl(null, Validators.required),
      policeId: new FormControl(null, Validators.required),
      // subadminId: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      gender: new FormControl(null, Validators.required)
    });
  }


  //Designation for Police
  designationOptions: string[] = [
    "पोलीस निरीक्षक (पोनि)",
    "पोलीस उपनिरीक्षक (पोउपनि)",
    "सहाय्यक पोलीस उपनिरीक्षक (सपोउपनि)",
    "पोलीस हेड कॉन्स्टेबल (पोहेकॉ)",
    "पोलीस कॉन्स्टेबल (पोकॉ)",
    "उप विभागीय पोलीस अधिकारी (उपविपोअ)",
    "उच्च पोलीस अधिकारी (उपोअ)",
    "पोना",
    "मापोना"
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
    }
    else {
      this.policeService.registerPolice(this.reactiveForm.value).subscribe();
      this.router.navigate(['/subadmin/police']);
      this._snackBar.open("Police registered Successfully", "OK", {
        duration: 3000
      });
    }
  }
}
@Component({
  selector: 'dialog-animations-example',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
}
