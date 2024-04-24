import { ApiResponse } from "./ApiResponse";
import { BaseRepository } from "./BaseRepository";

export interface IEmployee {
    id: string;
    name: string;
}

export class EmployeeRepository extends BaseRepository<IEmployee> {
    collection = 'employ';

    public getMany(pageNumber: number, pageSize: number): Promise<ApiResponse<IEmployee[]>> {
        return super.getMany(pageNumber,pageSize);
    }
}