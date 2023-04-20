import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AplicacionService } from '../../../services/modules/aplicacion.service';

declare var swal: any;

export class Model {
  title: any;
  tipo = 'C';

  varAplicacion: any = {
    aplicacion_id: 0,
    nombre: "",
    descripcion: "",
    tipo_aplicacion: 0,
    orden: 0,
    url: "",
    logo: "../../../../assets/images/fileupload.jpg",
    saml: false,
    activo: true
  }
}

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.scss']
})
export class AplicacionComponent implements OnInit {

  model = new Model();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  modal: any;

  currentUser: any;
  lstTipoAplicacion: any = [];

  constructor(private router: Router, private api: ApiService, private app: AplicacionService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varAplicacion.usuario_creador = this.currentUser.usuario;
    this.model.varAplicacion.usuario_modificador = this.currentUser.usuario;
   }

  ngOnInit(): void {
    this.getAplicaciones();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  search(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.nombre.toString().toLowerCase().indexOf(filtro) !== -1 ||
            //item.descripcion.toString().toLowerCase().indexOf(filtro) !== -1) {
            item.tipo_aplicacion.toString().toLowerCase().indexOf(filtro) !== -1) {
             return true;
        }
        return false;
      });
    }
  }

  getAplicaciones() {
    let json = {
      filtro: 0
    }

    this.app.getAplicaciones(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });

    this.app.getTipoAplicaciones().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.lstTipoAplicacion = response.result;
      }
    })
  }

  openModal() {
    this.modal = true;
    this.model = new Model();
    this.model.title = "Crear Aplicación";
    this.model.tipo = 'C';
  }

  editModal(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Aplicación";
    this.model.tipo = 'U';

    this.model.varAplicacion.aplicacion_id = data.aplicacion_id;
    this.model.varAplicacion.nombre = data.nombre;
    this.model.varAplicacion.descripcion = data.descripcion;
    this.model.varAplicacion.tipo_aplicacion = data.tipo_aplicacion_id;
    this.model.varAplicacion.orden = data.orden;
    this.model.varAplicacion.url = data.url;
    this.model.varAplicacion.logo = data.logo;
    this.model.varAplicacion.saml = (data.saml == 'S') ? true : false;
    this.model.varAplicacion.activo = (data.activo == 'S') ? true : false;
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  uploadFile($event: any) {
    const file = $event.target.files[0];
    
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      swal({
        "title": 'Error',
        "text": "Sólo se admiten imágenes.",
        "icon": "error"
      });
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.model.varAplicacion.logo = reader.result; 
    }
  }

  saveAplicacion() {
    this.model.varAplicacion.usuario_creador = this.currentUser.usuario;
    this.model.varAplicacion.usuario_modificador = this.currentUser.usuario;

    this.model.varAplicacion.tipo_aplicacion = Number(this.model.varAplicacion.tipo_aplicacion);

    if (this.model.varAplicacion.tipo_aplicacion == 0) {
      swal({
        title: 'ERROR',
        text: 'Debe seleccionar un campo Tipo de Aplicación',
        type: 'error',
        allowOutsideClick: false,
        showConfirmButton: true,
      });
    }
    else {
      this.app.createAplicaciones(this.model.varAplicacion).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Aplicaciones',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.modal = false;
            this.reload();
          })
        }
      });
    }
  }

  updateAplicacion() {
    this.model.varAplicacion.usuario_creador = this.currentUser.usuario;
    this.model.varAplicacion.usuario_modificador = this.currentUser.usuario;

    this.model.varAplicacion.tipo_aplicacion = Number(this.model.varAplicacion.tipo_aplicacion);

    if (this.model.varAplicacion.tipo_aplicacion == 0) {
      swal({
        title: 'ERROR',
        text: 'Debe seleccionar un campo Tipo de Aplicación',
        type: 'error',
        allowOutsideClick: false,
        showConfirmButton: true
      });
    }
    else {
      this.app.updateAplicaciones(this.model.varAplicacion).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Aplicaciones',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.modal = false;
            this.reload();
          })
        }
      });
    }
  }

}
