import { Component } from '@angular/core';
import { Category } from '../../classes/enums/enums';
import { LayoutService } from '../../service/layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  Category = Category;

  get isHidden(): boolean {
    return this.isMobile && this.layoutService.hiddenMenu;
  }

  get isMobile(): boolean {
    return this.layoutService.isMobile;
  }

  constructor(
    public layoutService: LayoutService
  ){}

  close(){
    this.layoutService.toggleHiddenMenu();
  }
}
