import { Role } from "./role.model";

export interface User {
    id: string;
    name: string;
    password: string;
    role: Role
}


