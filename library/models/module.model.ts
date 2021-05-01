import { Actuator } from "./actuator.model";
import { Sensor } from "./sensor.model";
import { SmartHomeElement } from "./smartHomeElement.model";


export interface Module {
    id: string;
    description: string;
    name: string;
    sensor: Sensor;
    actuator: Actuator;
    type: SmartHomeElement;
}


