import { Police } from "./police.models";

export class Subadmin {
    id:number;
    username: string;
    password: string;
    phone: string;
    email: string;
    station: string;
    admin_id: string;

    constructor(subadmin:any){
        this.id = subadmin.id;
        this.username = subadmin.username;
        this.phone = subadmin.phone;
        this.email = subadmin.email;
        this.station = subadmin.station;
        this.admin_id = subadmin.admin_id;
    }
}

export class CurrentSubadmin{
    id:number;
    username: string;
    password: string;
    phone: string;
    email: string;
    station: string;
    admin_id: string;
    polices:[Police];
    attendances:[Object];
}