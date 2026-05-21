import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

  constructor(
      private router: Router,
      private cookieService: CookieService
  ){}

  ngOnInit(): void {
    if(!this.cookieService.check(environment.token_cookie_key)){
        this.router.navigate(['/login'])
    }
  }
}
