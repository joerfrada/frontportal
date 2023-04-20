import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.scss']
})
export class ApplicationCardComponent implements OnInit {

  @Input() array?: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
