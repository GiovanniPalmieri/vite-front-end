import { ApiResponse } from "./ApiResponse";
import { HttpClient } from "./HttpClient";
import { IBaseRepository } from "./IBaseRepository";

export abstract class BaseRepository<T> extends HttpClient implements IBaseRepository<T> {

    protected collection: string | undefined;

    public async getMany(pageNumber: number, pageSize: number): Promise<ApiResponse<T>> {
       const instance = this.createInstance();
       const result = await instance.get(`${}`) 
    }

}