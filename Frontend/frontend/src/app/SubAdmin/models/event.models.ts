import { Police } from "./police.models";

export interface Event {
  id: number;
  head: Police;
  date: Date;
  eventname:string;
  description:string;
}
