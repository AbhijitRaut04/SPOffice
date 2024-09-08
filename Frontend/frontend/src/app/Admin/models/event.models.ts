import { Subadmin } from '../../SubAdmin/models/subadmin.models';
import { Police } from './police.models';
import { Subevent } from './subevent.models';

export class Event {
  id: number;
  adminId: number;
  head: Police;
  cohead: Police;
  subpatrollings: Subevent[];
  date: Date;
  eventname: string;
  description: string;
  attendance: Map<string, Police>;
}


