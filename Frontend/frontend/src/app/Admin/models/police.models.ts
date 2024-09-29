import { Subadmin } from "./subadmin.model";

export interface Police {
    id: number,
    fullname: string,
    policeId: number,
    phone: string,
    email: string;
    gender: string;
    designation: string;
    subadmin:Subadmin;
}