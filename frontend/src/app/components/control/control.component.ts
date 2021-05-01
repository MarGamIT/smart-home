import { Component, OnInit } from '@angular/core';
import { Module } from '../../../../../library/models/module.model';
import { SmartHomeElement } from "../../../../../library/models/smartHomeElement.model";

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
    var nursery: Module = {
      id: "", name: "Nursery ", description: "",
      sensor: {
        id: "",
        name: "",
        value: 22,
        isActivated: true
      },
      actuator: {
        id: "",
        name: "lul",
        value: 20,
        isActivated: true
      },
      type: SmartHomeElement.ac
    };

    var kitchenLamp: Module = {
      id: "", name: "Kitchen Lamp", description: "Power: 400W",
      sensor: {
        id: "",
        name: "KitchenLampSensor",
        value: 0,
        isActivated: true
      },
      actuator: {
        id: "",
        name: "KitchenLampActuator",
        value: 0,
        isActivated: true
      },
      type: SmartHomeElement.lamp
    };

    var floorLamp: Module = {
      id: "", name: "Floor Lamp", description: "Power: 200W",
      sensor: {
        id: "",
        name: "FloorLampSensor",
        value: 0,
        isActivated: true
      },
      actuator: {
        id: "",
        name: "FloorLampActuator",
        value: 0,
        isActivated: true
      },
      type: SmartHomeElement.lamp
    };

    var bedRoom: Module = {
      id: "", name: "Bed Room", description: "",
      sensor: {
        id: "",
        name: "Bed Room Sensor",
        value: 22,
        isActivated: true
      },
      actuator: {
        id: "",
        name: "Bed Room Actuator",
        value: 22,
        isActivated: true
      },
      type: SmartHomeElement.ac
    };

    var tv: Module = {
      id: "", name: "TV", description: "Power Rangers",
      sensor: {
        id: "",
        name: "TV Sensor",
        value: 0,
        isActivated: true
      },
      actuator: {
        id: "",
        name: "TV Actuator",
        value: 0,
        isActivated: true
      },
      type: SmartHomeElement.tv
    };

    var ledLight: Module = {
      id: "", name: "Hall Way LED", description: "Lumen: 2500L",
      sensor: {
        id: "",
        name: "Hall Way Sensor",
        value: 0x1976D2,
        isActivated: true
      },
      actuator: {
        id: "",
        name: "Hall Way Actuator",
        value: 16777215,
        isActivated: true
      },
      type: SmartHomeElement.ledLight
    };

    var oven: Module = {
      id: "", name: "Oven ", description: "Power: 2300W",
      sensor: {
        id: "",
        name: "Oven Sensor",
        value: 0,
        isActivated: true
      },
      actuator: {
        id: "",
        name: "Oven Actuator",
        value: 0,
        isActivated: true
      },
      type: SmartHomeElement.oven
    };
    var fridge: Module = {
      id: "", name: "Fridge  ", description: "Power: 2300W",
      sensor: {
        id: "",
        name: "Fridge Sensor",
        value: -7,
        isActivated: true
      },
      actuator: {
        id: "",
        name: "Fridge Actuator",
        value: -10,
        isActivated: true
      },
      type: SmartHomeElement.fridge
    };

    var kitchen: Module = {
      id: "", name: "Nursery ", description: "",
      sensor: {
        id: "",
        name: "",
        value: 28,
        isActivated: true
      },
      actuator: {
        id: "",
        name: "lul",
        value: 22,
        isActivated: true
      },
      type: SmartHomeElement.ac
    };

    this.modules.push(nursery);
    this.modules.push(bedRoom);
    this.modules.push(floorLamp);
    this.modules.push(oven);

    this.modules.push(fridge);
    this.modules.push(tv);
    this.modules.push(ledLight);
    this.modules.push(kitchenLamp);
    this.modules.push(kitchen);
  }
}
