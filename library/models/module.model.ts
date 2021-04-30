import { Actuator } from "./actuator.model";
import { Sensor } from "./sensor.model";


export interface Module {
    id: string;
    name: string;
    sensors: Sensor[];
    actuators: Actuator[];
}
