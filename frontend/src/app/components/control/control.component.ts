import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  public isActivated: boolean = true;
  public value: number;

  constructor() {
    this.value = 20;
  }

  ngOnInit(): void {
  }
}
