import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformComponent } from './platform.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../modules/home/home.component';
import { AplicacionesComponent } from '../modules/admin/aplicaciones/aplicaciones.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'portal', component: PlatformComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'modulo/admin/aplicacion', component: AplicacionesComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
