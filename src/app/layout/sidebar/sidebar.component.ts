import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUser: any;
  allMenu: Menu[] = [];
  usuario = new Usuario();

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUsers") as any);
    this.usuario.usuario = this.currentUser[0].usuario.toUpperCase();
    this.allMenu = this.currentUser[0].menus;
  }

  ngOnInit(): void {
  }

}
