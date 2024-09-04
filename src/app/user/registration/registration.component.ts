import { Component, signal } from '@angular/core';
import { FormBuilder,FormControl,Validators,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
   // Form controls for the form group
   nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
   emailControl = new FormControl('', [Validators.required, Validators.email]);
   passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
   confirmPasswordControl = new FormControl('', [Validators.required]);
 
   // Form group initialization
   registrationForm: FormGroup;
 
   constructor(private fb: FormBuilder) {
     this.registrationForm = this.fb.group({
       name: this.nameControl,
       email: this.emailControl,
       password: this.passwordControl,
       confirmPassword: this.confirmPasswordControl
     }, { validator: this.passwordMatchValidator.bind(this) });
   }
 
   // Custom validator to check if passwords match
   passwordMatchValidator(formGroup: FormGroup) {
     const password = formGroup.get('password');
     const confirmPassword = formGroup.get('confirmPassword');
     return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
   }
 
   // Handle form submission
   onSubmit() {
     if (this.registrationForm.valid) {
       // Handle registration logic
       console.log(this.registrationForm.value);
     }
   }
 }