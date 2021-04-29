import { Actuator } from "./actuator.model";
import { Sensor } from "./sensor.model";
import { User } from "./user.model";


export interface Home {
    id: string;
    members: User[];
    module: Module[];
}

export interface Module {
    id: string;
    name: string;
    sensors: Sensor[];
    actuators: Actuator[];
}