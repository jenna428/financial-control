import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../classes/enums/enums';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  Category = Category;

  constructor(
    private router: Router
  ){}
}
