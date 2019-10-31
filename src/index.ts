import axios from 'axios';

class ApiService {
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
        this.updateUrl()
    }

    public changeAuthSchema(newSchema: string): void {
        this.authSchema = newSchema;
    }

    public async query(resource: string, params: any): Promise<any> {
        this.updateHeader();
        return await axios.get(resource, params).catch((error: any) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    };

    public async get(resource: string, slug = ''): Promise<any> {
        this.updateHeader();
        return await axios.get(`${resource}/${slug}`).catch((error: any) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    };

    public async post(resource: string, params: any): Promise<any> {
        this.updateHeader();
        return await axios.post(`${resource}`, params);
    };

    public async update(resource: string, slug: string, params: any): Promise<any> {
        this.updateHeader();
        return await axios.put(`${resource}/${slug}`, params);
    };

    public async put(resource: string, params: any): Promise<any> {
        this.updateHeader();
        return await axios.put(`${resource}`, params);
    };

    public async delete(resource: string): Promise<any> {
        this.updateHeader();
        return await axios.delete(resource).catch((error: any) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    };
}

class JwtService {
    private tokenKey = 'jwt';

    public updateTokenKey(tokenKey: string): void {
        this.tokenKey = tokenKey;
    }

    public getToken(): string | null {
        return window.localStorage.getItem(this.tokenKey);
    };

    public saveToken(token: string): void {
        window.localStorage.setItem(this.tokenKey, token);
    };

    public destroyToken(): void {
        window.localStorage.removeItem(this.tokenKey)
    };
}

export const apiService = new ApiService();
export const jwtService = new JwtService();
