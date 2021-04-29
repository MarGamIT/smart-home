import { Actuator } from "./actuator.model";
import { Sensor } from "./sensor.model";
import { User } from "./user.model";


export interface Home {
    id: string;
    members: User[];
    Room: Room[];
}

export interface Room {
    id: string;
    name: string;
    sensors: Sensor[];
    actuators: Actuator[];
}