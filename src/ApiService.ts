import redaxios from '@ryanchristian4427/redaxios';

import { AuthStorageService } from './AuthStorageService';

export class ApiService {
    private baseUrl = '/api/v1';
    private authSchema = 'Bearer';
    private authStorageService: AuthStorageService;

    constructor(authStorageService: AuthStorageService) {
        this.authStorageService = authStorageService;
    }

    private headers(): { [name: string]: string } {
        return {
            Authorization: `${this.authSchema} ${this.authStorageService.getToken()}`,
        };
    }

    public changeApiUrl(newUrl: string): void {
        this.baseUrl = newUrl;
    }

    public changeAuthSchema(newSchema: string): void {
        this.authSchema = newSchema;
    }

    public async query(resource: string, params: Record<string, unknown>): Promise<any> {
        return await redaxios.get(
            `${this.baseUrl}/${resource}/${Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join('&')}`,
            {
                headers: this.headers(),
            },
        );
    }

    public async get(resource: string): Promise<any> {
        return await redaxios.get(`${this.baseUrl}/${resource}`, {
            headers: this.headers(),
        });
    }

    public async post(resource: string, params: Record<string, unknown>): Promise<any> {
        return await redaxios.post(`${this.baseUrl}/${resource}`, params, {
            headers: this.headers(),
        });
    }

    public async put(resource: string, params: Record<string, unknown>): Promise<any> {
        return await redaxios.put(`${this.baseUrl}/${resource}`, params, {
            headers: this.headers(),
        });
    }

    public async patch(resource: string, params: Record<string, unknown>): Promise<any> {
        return await redaxios.patch(`${this.baseUrl}/${resource}`, params, {
            headers: this.headers(),
        });
    }

    public async delete(resource: string): Promise<any> {
        return await redaxios.delete(`${this.baseUrl}/${resource}`, {
            headers: this.headers(),
        });
    }
}
