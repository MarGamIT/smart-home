import { Module } from "./module.model";
import { User } from "./user.model";


export interface Home {
    id: string;
    members: User[];
    modules: Module[];
}

