import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform.component';
import { LoginComponent } from '../login/login.component';
import { LayoutModule } from '../layout/layout.module';
import { SamlComponent } from '../saml/saml.component';
import { ApplicationCardComponent } from '../views/application-card/application-card.component';
import { BreadcrumbComponent } from '../views/breadcrumb/breadcrumb.component';
import { ModalComponent } from '../views/modal/modal.component';
import { AplicacionComponent } from '../modules/admin/aplicacion/aplicacion.component';
import { HomeComponent } from '../modules/home/home.component';

@NgModule({
  declarations: [
    PlatformComponent,
    LoginComponent,
    SamlComponent,
    ApplicationCardComponent,
    BreadcrumbComponent,
    ModalComponent,
    AplicacionComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    FormsModule,
    LayoutModule
  ]
})
export class PlatformModule { }
