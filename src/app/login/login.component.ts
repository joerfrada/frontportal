import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/auth/login.service';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: any = "";
  password: any = "";
  titleLogin = "Iniciar sesión";

  loader = false;

  constructor(private loginService: LoginService, private api: ApiService) { }

  ngOnInit(): void {
  }

  inputNext() {
    $('.inputp').focus();
  }

  login() {
    this.titleLogin = "Iniciando sesión... Espere";    
    this.loginService.login({ usuario: this.usuario }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo === 0) {
        delete this.password;
        localStorage.setItem("currentUsers", JSON.stringify(response.user.result));
        localStorage.setItem("auth-tokens", response.token);
        this.loader = true;
        setTimeout(() => {
          location.href = "/portal/home";
        }, 1000);
      }
      else {
        swal({
          title: 'ERROR',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'error'
        }).then((result: any) => {
          if (result) {
            this.titleLogin = "Iniciar sesión";
            this.password = "";
          }
        });
      }
    });
  }

}
