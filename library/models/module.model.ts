import { Actuator } from "./actuator.model";
import { Sensor } from "./sensor.model";


export interface Module {
    id: string;
    name: string;
    sensor: Sensor;
    actuator: Actuator;
}

export enum SmartHomeElement {
    lamp = "lamp",
    ledLight = "ledLight",
    fridge = "fridge",
    tv = "tv",
    oven = "oven",
    ac = "ac"
}
