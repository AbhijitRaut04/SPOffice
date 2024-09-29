import { Police } from './police.models';
import { Subadmin } from './subadmin.models';

export interface Event {
  id: number;
  head: Police;
  date: Date;
  eventname: string;
  description: string;
  attendance: Attendance[];
}

export class Attendance {
  subadmin: Subadmin;
  polices: Police[];
  constructor(subadmin: Subadmin, polices: Police[]) {
    this.subadmin = subadmin;
    this.polices = polices;
  }
}
