import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUser: any;
  allMenu: Menu[] = [];

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.allMenu = this.currentUser[0].menus;
  }

  ngOnInit(): void {
  }

}
