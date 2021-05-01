import { Actuator } from "./actuator.model";
import { Sensor } from "./sensor.model";


export interface Module {
    id: string;
    description: string;
    name: string;
    sensor: Sensor;
    actuator: Actuator;
    type: SmartHomeElement;
}

export enum SmartHomeElement {
    lamp = "lamp",
    ledLight = "ledLight",
    fridge = "fridge",
    tv = "tv",
    oven = "oven",
    ac = "ac"
}
