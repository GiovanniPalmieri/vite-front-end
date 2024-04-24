import axios, { AxiosInstance, AxiosResponse } from "axios";

export abstract class HttpClient {
    protected instance: AxiosInstance | undefined;
    
    protected createInstance(): AxiosInstance {
        this.instance = axios.create({
            baseURL: "localhost:5054",
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.initializeResponseInterceptor();
        return this.instance;
    }
    
    private initializeResponseInterceptor = () => {
        this.instance?.interceptors.response.use(this.handleResponse, this.handleError);
        const token = localStorage.getItem("jwtToken");
        this.instance?.interceptors.request.use((config: any) => {
            config.header = {
                Authorization: `Bearer ${token}`,
            };
            return config;
        });
    }
    
    private handleResponse = ({data}: AxiosResponse ) => data;
    
    private handleError= (error: any) => Promise.reject(error);
}