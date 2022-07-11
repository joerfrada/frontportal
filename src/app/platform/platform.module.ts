import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlatformRoutingModule } from './platform-routing.module';
import { LoginComponent } from '../login/login.component';
import { PlatformComponent } from './platform.component';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from '../modules/home/home.component';
import { AplicacionesComponent } from '../modules/admin/aplicaciones/aplicaciones.component';
import { BreadcrumbComponent } from '../views/breadcrumb/breadcrumb.component';
import { ModalComponent } from '../views/modal/modal.component';
import { ApplicationCardComponent } from '../views/application-card/application-card.component';


@NgModule({
  declarations: [
    PlatformComponent,
    LoginComponent,
    HomeComponent,
    AplicacionesComponent,
    BreadcrumbComponent,
    ModalComponent,
    ApplicationCardComponent,
    
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    FormsModule,
    LayoutModule
  ]
})
export class PlatformModule { }
