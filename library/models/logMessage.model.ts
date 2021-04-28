import { User } from "./user.model";
import { Activity } from "./activity.model";


export interface LogMessage {
    id: string;
    message: string;
    type: Activity;
    user: User;
    date: Date;
}
