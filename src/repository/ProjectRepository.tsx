import { ApiResponse } from "./ApiResponse";
import { BaseRepository } from "./BaseRepository";

export interface IProject {
    id: string;
    name: string;
    managerId: string;
}

export class ProjectRepository extends BaseRepository<IProject> {
    collection = 'project';
    
    public getMany(pageNumber: number, pageSize: number): Promise<ApiResponse<IProject[]>> {
       return super.getMany(pageNumber,pageSize); 
    }
}