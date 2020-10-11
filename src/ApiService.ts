import redaxios from 'redaxios';

import { AuthStorageService } from './AuthStorageService';

type HttpMethods = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options';

export class ApiService {
    private baseUrl = '/api/v1';
    private authSchema = 'Bearer';
    private authStorageService: AuthStorageService;

    constructor(authStorageService: AuthStorageService) {
        this.authStorageService = authStorageService;
    }

    private headers(): Record<string, string> {
        return {
            Authorization: `${this.authSchema} ${this.authStorageService.getToken()}`,
        };
    }

    public changeBaseUrl(baseUrl: string): void {
        this.baseUrl = baseUrl;
    }

    /**
     * @deprecated Deprecated since v2.0.7. Will be removed in v3.0.0. Use `changeBaseUrl()` instead.
     */
    public changeApiUrl(baseUrl: string): void {
        this.changeBaseUrl(baseUrl);
    }

    public changeAuthSchema(authSchema: string): void {
        this.authSchema = authSchema;
    }

    private request = (method: HttpMethods) => {
        return method === 'get' || method === 'delete' || method === 'options'
            ? (resource: string, params?: Record<string, unknown>) => {
                  return redaxios[method](`${this.baseUrl}/${resource}`, { headers: this.headers(), params });
              }
            : (resource: string, data?: Record<string, unknown>, params?: Record<string, unknown>) => {
                  return redaxios[method](`${this.baseUrl}/${resource}`, data, { headers: this.headers(), params });
              };
    };

    public get = this.request('get');
    /**
     * @deprecated Deprecated since v2.0.11. Will be removed in v3.0.0. Use `get()` instead.
     */
    public query = this.request('get');
    public post = this.request('post');
    public put = this.request('put');
    public patch = this.request('patch');
    public delete = this.request('delete');
}
