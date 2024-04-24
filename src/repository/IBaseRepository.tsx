import { ApiResponse } from "./ApiResponse";

export interface IBaseRepository<T> {
    getMany(pageNumber: number, pageSize: number): Promise<ApiResponse<T[]>>;
}