import { TaskEntity } from "../../models/Models";

export type TaskAction = 
    | {type: 'DELETE_TASK', task: TaskEntity}
    | {type: 'ADD_TASK', task: TaskEntity}