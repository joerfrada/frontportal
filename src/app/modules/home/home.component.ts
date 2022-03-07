import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AplicacionService } from '../../services/modules/aplicacion.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   varAplicacion: any = [];
   varAplicacionExterna: any = [];
   varAplicacionInterna: any = [];

   tab: any;

  constructor(private api: ApiService, private app: AplicacionService) {}

  ngOnInit(): void {
     this.tab = 1;
     this.getAplicaciones();
  }

  selectTab(tab: any) {
    this.tab = tab;
  }

  getAplicaciones() {
   this.app.getAplicacionesFull().subscribe(data => {
     let response: any = this.api.ProcesarRespuesta(data);
     if (response.tipo == 0) {
       this.varAplicacion = response.result;
       this.varAplicacionExterna = response.result.filter((x: any) => x.tipo_aplicacion_id == 1);
       this.varAplicacionInterna = response.result.filter((x: any) => x.tipo_aplicacion_id == 2);
     }
   });
 }

}
