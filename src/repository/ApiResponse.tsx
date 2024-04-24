export class ApiResponse<T> {
    data?: T;
    succeded?: boolean;
    errors: any
}