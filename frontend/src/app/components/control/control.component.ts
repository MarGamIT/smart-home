import { Component, OnInit } from '@angular/core';
import { Module, SmartHomeElement } from '../../../../../library/models/module.model';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  public confirmButtonDisabled: boolean;
  public modules: Module[];
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
    this.confirmButtonDisabled = false;
    this.modules = [];
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

  // updates modules
  public async updateModulesAsync(): Promise<void> {
    this.confirmButtonDisabled = true;
    // await this.controlService.updateModulesAsync(modules);
    this.confirmButtonDisabled = false;
  }

  ngOnInit(): void {
    var test:Module = {id: "1", name: "Kitchen", description: "Power: 400W", sensor: {id: "11", name: "KitchenSensor", value: 22, isActivated: true}, actuator: {id: "22", name: "lul", value: 22, isActivated: true}, type: SmartHomeElement.lamp};
    this.modules.push(test);
    this.modules.push(test);
  }
}
