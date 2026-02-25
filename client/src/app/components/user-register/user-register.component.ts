import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router } from '@angular/router';
import { UserRegisterDto } from '../../dto/user-register.dto';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {

  form: FormGroup

  hide = true;

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ){
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    })
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
