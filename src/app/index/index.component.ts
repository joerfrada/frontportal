import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HomeService } from '../services/modules/home.service';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  loader = false;

  constructor(private homeService: HomeService, private api: ApiService) { }

  ngOnInit(): void {
    this.home();
  }

  home() {
    this.homeService.home({usuario: "admin"}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo === 0) {
        console.log(response);
        localStorage.setItem("currentUsers", JSON.stringify(response.user.result));
        localStorage.setItem("auth-tokens", response.token);
        this.loader = true;
        setTimeout(() => {
          location.href = "/portal/home";
        }, 50);
      }
    });
  }

}
