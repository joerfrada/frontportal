import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformComponent } from './platform.component';
import { SamlComponent } from '../saml/saml.component';
import { HomeComponent } from '../modules/home/home.component';
import { AplicacionComponent } from '../modules/admin/aplicacion/aplicacion.component';
// import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'saml', component: SamlComponent },
  { path: '',   redirectTo: '/saml', pathMatch: 'full' },
  { path: 'portal', component: PlatformComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'modulo/admin/aplicacion', component: AplicacionComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
