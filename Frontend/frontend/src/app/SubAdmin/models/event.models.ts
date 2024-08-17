import { Police } from "./police.models";

export interface Event {
  id: number;
  head: Police;
  date: Date;
  eventname:string;
  description:string;
  attendances:Attendance;
}

export interface Attendance{
  id: number;
  polices: [Police];
}