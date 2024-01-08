import { CalenderEnum } from "../enum/CalenderEnum";

export type CalenderModel = {
    id?: number;
    calenderType: CalenderEnum;
    title: string;
    description: string;
    traits: Object;
    userId: Number;
    participants: Number[];
}