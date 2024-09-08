import { Police } from './police.models';

export interface Area {
  id: number;
  areaName: string;
  headId: Police;
  coheadId: Police;
  subPatrollingId: number;
}