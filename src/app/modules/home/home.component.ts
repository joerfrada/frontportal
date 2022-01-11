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

  constructor(private api: ApiService, private app: AplicacionService) {}

  ngOnInit(): void {
     this.getAplicaciones();
  }

  getAplicaciones() {
   this.app.getAplicacionesFull().subscribe(data => {
     let response: any = this.api.ProcesarRespuesta(data);
     if (response.tipo == 0) {
       this.varAplicacion = response.result;
     }
   });
 }

}
