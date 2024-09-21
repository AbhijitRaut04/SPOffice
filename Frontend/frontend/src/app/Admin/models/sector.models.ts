import { Area } from "./area.models";
import { Location } from "./location.models";
import { Police } from "./police.models";

export interface Sector{
    id:number;
    sectorName:string;
    head:Police;
    area:Area;
    locations:Location[];
}