import { Police } from "./police.models";

export class Subadmin {
    username: string;
    password: string;
    phone: string;
    email: string;
    station: string;
    admin_id: string;
}

export class CurrentSubadmin{
    username: string;
    password: string;
    phone: string;
    email: string;
    station: string;
    admin_id: string;
    polices:[Police];
    attendances:[Object];
}