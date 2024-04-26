import { ApiResponse } from "./ApiResponse";
import { BaseRepository } from "./BaseRepository";

export interface ITask{
    Id: string;
    Name: string;
    Description: string;
    ProjectId: string;
}

export class TaskRepository extends BaseRepository<ITask> {

    public updateCollection(projectId: string, employeeId: string) {
        this.getCollection = () => `employee/${employeeId}/projects/${projectId}/task` 
    }

    public getMany(pageNumber: number, pageSize: number): Promise<ApiResponse<ITask[]>> {
        return super.getMany(pageNumber, pageSize);
    }

    public delete(id: any) {
        return super.delete(id);
    }
}