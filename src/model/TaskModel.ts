import { TaskStatus } from "../enum/TaskStatus";
import { TaskType } from "../enum/TaskType";

export type TaskModel = {
    id: number;
    type: TaskType;
    title: string;
    description: string;
    userId: Number;
    responsibleId: Number;
    status: TaskStatus;
}