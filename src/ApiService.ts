import axios from 'axios';
import {JwtService} from './JwtService';

export class ApiService {
    private apiUrl = '/api/v1';
    private authSchema = 'Bearer';
    private jwtService = new JwtService();

    private updateUrl(): void {
        axios.defaults.baseURL = this.apiUrl;
    }

    private updateHeader(): void {
        axios.defaults.headers.common.Authorization = `${this.authSchema} ${this.jwtService.getToken()}`;
    }

    constructor() {
        this.updateUrl();
    }

    public changeApiUrl(newUrl: string): void {
        this.apiUrl = newUrl;
        this.updateUrl();
    }

    public changeAuthSchema(newSchema: string): void {
        this.authSchema = newSchema;
    }

    public async query(resource: string, params: { params: object }): Promise<any> {
        this.updateHeader();
        return await axios.get(resource, params);
    };

    public async get(resource: string, slug = ''): Promise<any> {
        this.updateHeader();
        return await axios.get(`${resource}/${slug}`);
    };

    public async post(resource: string, params: object): Promise<any> {
        this.updateHeader();
        return await axios.post(`${resource}`, params);
    };

    public async update(resource: string, slug: string, params: object): Promise<any> {
        this.updateHeader();
        return await axios.put(`${resource}/${slug}`, params);
    };

    public async put(resource: string, params: object): Promise<any> {
        this.updateHeader();
        return await axios.put(`${resource}`, params);
    };

    public async delete(resource: string): Promise<any> {
        this.updateHeader();
        return await axios.delete(resource);
    };
}
