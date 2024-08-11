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
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, FormsModule, ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './police-signup.component.html',
  styleUrl: './police-signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PoliceSignupComponent implements OnInit {


  // Details in Form with Validators 
  reactiveForm: FormGroup;
  ngOnInit() {
      this.reactiveForm = new FormGroup({
        fullname: new FormControl(null, Validators.required),
        policeID: new FormControl(null, Validators.required),
        subAdmin: new FormControl(null, Validators.required),
        designation: new FormControl(null, Validators.required),
        email: new FormControl(null,[Validators.required, Validators.email]),
        phone: new FormControl(null,[Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
        password: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)]),
        confirmPassword: new FormControl(null, [Validators.required]),
      });
  }


  //Designation for Police
  designationOptions: string[] = ["Director General of Police (DGP)",
    "Additional Director General of Police (ADGP)",
    "Inspector General of Police (IGP)",
    "Deputy Inspector General of Police (DIG)",
    "Superintendent of Police (SP)",
    "Senior Superintendent of Police (SSP)",
    "Assistant Superintendent of Police (ASP)",
    "Deputy Superintendent of Police (DSP)",
    "Inspector of Police",
    "Sub-Inspector of Police (SI)",
    "Assistant Sub-Inspector of Police (ASI)",
    "Head Constable",
    "Police Constable"];


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
  // Get Form data using
  // console.log(this.reactiveForm)
  formSubmitted() {
    if(this.reactiveForm.invalid){
      this.displayError= true;
    }
    else {
      console.log('form submitted')
    }
  }
  
  //pop up error box handling
  displayError = false;
  closeErrorBox(){
    this.displayError= false;
  }
}
