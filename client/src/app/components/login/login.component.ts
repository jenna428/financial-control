import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from '../../dto/login.dto';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ){}


  ngOnInit(): void {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  toRegister(){
    this.router.navigate(['/register'])
  }

  async submit(){
    const loginDto: LoginDto = this.form.getRawValue();

    await this.userService.login(loginDto);
  }
}
