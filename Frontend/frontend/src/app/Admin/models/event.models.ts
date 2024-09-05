import { Police } from './police.models';
import { Subevent } from './subevent.models';

export interface Event {
  id: number;
  adminId: number;
  head: Police;
  cohead: Police;
  subpatrollings: Subevent[];
  date: Date;
  eventname: string;
  description: string;
  attendance: Map<number, Police>;
}

export interface Pair{
  subadminId: number;
  polices: Police[];
}