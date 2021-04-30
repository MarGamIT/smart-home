import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  public nurseryValue: number;
  public floorLampValue: boolean;
  public livingRoomValue: number;
  public kitchenLampValue: boolean;
  public kitchenValue: number;
  public ledLightsValue: string;
  public ovenValue: boolean;
  public tvValue: boolean;
  public fridgeValue: number;

  constructor() {
    this.nurseryValue = 20;
    this.floorLampValue = false;
    this.livingRoomValue = 14;
    this.kitchenLampValue = true;
    this.kitchenValue = 28;
    this.ledLightsValue = '#1976D2';
    this.ovenValue = true;
    this.tvValue = true;
    this.fridgeValue = -4;
  }

  ngOnInit(): void {
  }
}
