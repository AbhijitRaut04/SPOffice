import { Police } from "./police.models";

export interface Subadmin {
    id: number;
    contact: string;
    username: string;
    station: string;
    polices:[Police];
}
export interface Request {
    id: number;
    contact: string;
    username: string;
    station: string;
    status: string;
}
