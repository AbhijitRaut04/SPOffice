import { Area } from "./area.models";
import { Police } from "./police.models";

export interface Subevent{
    subpatrollingname:string;
    head:Police;
    cohead:Police;
    id:number;
    description:string;
    instructions:string;
    area: Area[];
}