import { Police } from './police.models';

export interface Area {
  id: number;
  areaName: string;
  head: Police;
  subPatrollingId: number;
  description: string;
}