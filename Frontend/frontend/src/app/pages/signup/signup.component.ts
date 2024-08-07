import {ChangeDetectionStrategy,Component, OnInit, signal, viewChild} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NgClass, NgFor, NgIf } from '@angular/common';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, FormsModule, ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SignupComponent implements OnInit {

  reactiveForm: FormGroup;
  ngOnInit() {
      this.reactiveForm = new FormGroup({
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        stationName: new FormControl(null, Validators.required),
        designation: new FormControl(null, Validators.required),
        email: new FormControl(null,[Validators.required, Validators.email]),
        phone: new FormControl(null,[Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
        state: new FormControl('Maharashtra', Validators.required),
        city: new FormControl(null, Validators.required),
        pinCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
        landmark: new FormControl(null, Validators.required),
        area: new FormControl(null, Validators.required),
        password: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)]),
        confirmPassword: new FormControl(null, [Validators.required]),
      })
  }

  designationOptions: string[] = ['option1', 'option2', 'option3'];

  displayError = false;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  formSubmitted() {

    // console.log(this.reactiveForm)
    if(this.reactiveForm.invalid){
      this.displayError= true;
    }
    else {
      console.log('form submitted')
    }
  }

  closeErrorBox(){
    this.displayError= false;
  }
}
