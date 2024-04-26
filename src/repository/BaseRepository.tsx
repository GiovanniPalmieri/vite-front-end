import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "./ApiResponse";
import { HttpClient } from "./HttpClient";
import { IBaseRepository } from "./IBaseRepository";
import { CURRENT_BASE_URL } from "./constants";

const transformSuccess = (response: AxiosResponse): Promise<ApiResponse<any>> => {
    return new Promise((resolve ) => {
        const result: ApiResponse<any> = {
            data: response,
            succeded: true,
            errors: undefined,
        };
        resolve(result);
    });
}

const transformError = (response: AxiosError): Promise<ApiResponse<any>> => {
    return new Promise((resolve) => {
        const result: ApiResponse<any> = {
            data: undefined,
            succeded: false,
            errors: response
        };
        resolve(result);
    })
}

export abstract class BaseRepository<T> extends HttpClient implements IBaseRepository<T> {

    protected getCollection: (() => string) = () => {return ''};

    public async getMany(pageNumber: number, pageSize: number): Promise<ApiResponse<T[]>> {
        const instance = this.createInstance();
        const result = await instance.get(
            `${CURRENT_BASE_URL}/${this.getCollection()}/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            .then(transformSuccess).catch(transformError)
        return result as ApiResponse<T[]>;
    }

    public async delete(id: any): Promise<ApiResponse<T>> {
        const instance = this.createInstance();
        const result = await instance.delete(`${CURRENT_BASE_URL}/${this.getCollection()}/${id}`)
            .then(transformSuccess).catch(transformError);
        return result as ApiResponse<T>;
    }

}