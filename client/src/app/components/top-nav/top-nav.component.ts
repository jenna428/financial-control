import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ){}

  logout(){
    this.userService.logout();
    this.router.navigate(['/login'])
  }

}
