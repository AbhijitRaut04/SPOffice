import { Police } from "./police.models";

export interface Location{
    id:number;
    head:Police;
    locationName:string;
    equipments:Set<string>;
    headId:number;
    sectorId:number;
    polices:Police[],
    policeIds:Set<number>
}