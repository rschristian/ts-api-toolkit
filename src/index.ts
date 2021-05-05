import redaxios, { Options as RedaxiosOptions } from 'redaxios';

interface Options {
    tokenKey: string;
    baseUrl: string;
    authSchema: string;
}

type HttpMethod = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';

export default (function create(options?: Partial<Options>) {
    const opts: Options = Object.assign({ tokenKey: 'jwt', baseUrl: '/api/v1', authSchema: 'Bearer' }, options);

    const getToken = () => localStorage.getItem(opts.tokenKey);

    const formConfig = (config?: RedaxiosOptions) =>
        Object.assign(config || {}, {
            auth: getToken() ? `${opts.authSchema} ${getToken()}` : undefined,
            baseURL: opts.baseUrl,
        });

    const apiToolkit = (
        resource: string,
        method: HttpMethod,
        config: RedaxiosOptions,
        data?: Record<string, unknown>,
    ) => redaxios[method](resource, data, formConfig(config));

    apiToolkit.getToken = getToken;
    apiToolkit.saveToken = (token: string) => localStorage.setItem(opts.tokenKey, token);
    apiToolkit.destroyToken = () => localStorage.removeItem(opts.tokenKey);

    apiToolkit.get = (resource: string, config?: RedaxiosOptions) => redaxios['get'](resource, formConfig(config));
    apiToolkit.delete = (resource: string, config?: RedaxiosOptions) =>
        redaxios['delete'](resource, formConfig(config));
    apiToolkit.head = (resource: string, config?: RedaxiosOptions) => redaxios['head'](resource, formConfig(config));
    apiToolkit.options = (resource: string, config?: RedaxiosOptions) =>
        redaxios['options'](resource, formConfig(config));

    apiToolkit.post = (resource: string, data: Record<string, unknown>, config?: RedaxiosOptions) =>
        redaxios['post'](resource, data, formConfig(config));
    apiToolkit.put = (resource: string, data: Record<string, unknown>, config?: RedaxiosOptions) =>
        redaxios['put'](resource, data, formConfig(config));
    apiToolkit.patch = (resource: string, data: Record<string, unknown>, config?: RedaxiosOptions) =>
        redaxios['patch'](resource, data, formConfig(config));

    apiToolkit.create = create;

    return apiToolkit;
})();
