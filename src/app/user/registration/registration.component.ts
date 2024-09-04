import { Component} from '@angular/core';
import { FormControl, Validators,FormGroup ,ValidationErrors,ValidatorFn,AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent{

  registerForm = new FormGroup({
    name: new FormControl('', Validators.pattern(/\s/)),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: confirmPasswordValidator});


  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
  }
}
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ? { confirmPassword: true } : null;
};