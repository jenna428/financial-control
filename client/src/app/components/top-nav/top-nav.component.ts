import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../service/layout.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent {

  get hiddenMenu(): boolean {
    return this.layoutService.hiddenMenu;
  }
  
  get isMobile(): boolean {
    return this.layoutService.isMobile;
  }

  constructor(
    private readonly router: Router,
    private readonly layoutService: LayoutService
  ){}

  logout(){
    this.router.navigate(['login'])
  }

  toggleHiddenMenu() {
    this.layoutService.toggleHiddenMenu();
  }
}
