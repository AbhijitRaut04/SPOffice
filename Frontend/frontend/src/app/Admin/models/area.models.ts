import { Police } from "./police.models";
import { Sector } from "./sector.models";

export interface Area {
  id: number;
  areaName: string;
  headId: number;
  coheadId: number;
  head:Police;
  cohead:Police;
  subPatrollingId: number;
  sectors:Sector[];
}