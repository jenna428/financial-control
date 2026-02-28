import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { UserRegisterDto } from '../../dto/user-register.dto';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent implements OnInit {

  form: FormGroup

  hide = true;

  get isFormValid(): boolean {
    return this.form.valid;
  }

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ){
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), this.samePassword()]]
    })
  }

  ngOnInit(): void {
    this.form.get('password').valueChanges.subscribe(value => {
      const confirmPassContronl = this.form.get('confirmPassword');
      confirmPassContronl.setValue(confirmPassContronl.value);
    });
  }

  samePassword(): Validators {
      return (control: AbstractControl) : ValidationErrors | null => {

          const value = control.value;
          const passwordToCompare = this.form?.get('password')?.value;

          if (!value || !passwordToCompare) {
            return null;
          }

          return value !== passwordToCompare ? {differentPassword: passwordToCompare}: null;
      }
  }

  getError(errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }

    const keys = Object.keys(errors);
    const firstKey = keys[0];
    const value = errors[firstKey]

    switch(firstKey) {
      case 'required':
        return 'Este campo é obrigatório';
      case 'minlength':
        return `Este campo requer no minimo ${value.requiredLength} caracteres`;
      case 'differentPassword':
        return `Senhas não podem ser diferentes`;
      default:
        return ''
    }
  }

  toLogin(){
    this.router.navigate(['/login'])
  }

  async submit(){
    const userdto: UserRegisterDto = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    await this.userService.save(userdto, this.form.get('confirmPassword')?.value)
  }
}
