import { apiService, authStorageService } from '../src/index';
import { ApiService } from '../src/ApiService';

describe('API Service Tests', () => {
    it('should pass basic smoke test', () => {
        expect(apiService).toBeInstanceOf(ApiService);
    });

    /**
     * @deprecated Will be removed in v3.0.0.
     */
    it('should be able to change api URL', () => {
        const apiServiceDuplicate = new ApiService(authStorageService);
        apiServiceDuplicate.changeApiUrl('/api/v2');
        window.fetch = jasmine.createSpy('fetch').and.returnValue(Promise.resolve());

        apiServiceDuplicate.get('foo/bar');
        expect(window.fetch).toHaveBeenCalledWith('/api/v2/foo/bar', jasmine.anything());
    });

    it('should be able to change base URL', () => {
        const apiServiceDuplicate = new ApiService(authStorageService);
        apiServiceDuplicate.changeBaseUrl('/api/v2');
        window.fetch = jasmine.createSpy('fetch').and.returnValue(Promise.resolve());

        apiServiceDuplicate.get('foo/bar');
        expect(window.fetch).toHaveBeenCalledWith('/api/v2/foo/bar', jasmine.anything());
    });

    it('should be able to change auth schema', () => {
        const apiServiceDuplicate = new ApiService(authStorageService);
        apiServiceDuplicate.changeAuthSchema('Basic');
        window.fetch = jasmine.createSpy('fetch').and.returnValue(Promise.resolve());

        apiServiceDuplicate.get('foo/bar');
        expect(window.fetch).toHaveBeenCalledWith(
            '/api/v1/foo/bar',
            jasmine.objectContaining({
                headers: {
                    authorization: 'Basic ',
                },
            }),
        );
    });

    it('should issue GET requests with query parameters', async () => {
        window.fetch = jasmine
            .createSpy('fetch')
            .and.returnValue(Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve({}) }));

        const request = apiService.query('foo', { bar: true });
        expect(window.fetch).toHaveBeenCalledWith(
            '/api/v1/foo?bar=true',
            jasmine.objectContaining({
                method: 'get',
                headers: {
                    authorization: 'Bearer ',
                },
            }),
        );
        expect((await request).status).toEqual(200);
    });

    it('should issue GET requests', async () => {
        window.fetch = jasmine
            .createSpy('fetch')
            .and.returnValue(Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve({}) }));

        const request = apiService.get('foo/bar');
        expect(window.fetch).toHaveBeenCalledWith(
            '/api/v1/foo/bar',
            jasmine.objectContaining({
                method: 'get',
                headers: {
                    authorization: 'Bearer ',
                },
            }),
        );
        expect((await request).status).toEqual(200);
    });

    it('should issue POST requests', async () => {
        window.fetch = jasmine
            .createSpy('fetch')
            .and.returnValue(Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve({}) }));

        const request = apiService.post('foo', { bar: true });
        expect(window.fetch).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'post',
                headers: {
                    authorization: 'Bearer ',
                    'content-type': 'application/json',
                },
                body: '{"bar":true}',
            }),
        );
        expect((await request).status).toEqual(200);
    });

    it('should issue PUT requests', async () => {
        window.fetch = jasmine
            .createSpy('fetch')
            .and.returnValue(Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve({}) }));

        const request = apiService.put('foo', { bar: true, baz: false });
        expect(window.fetch).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'put',
                headers: {
                    authorization: 'Bearer ',
                    'content-type': 'application/json',
                },
                body: '{"bar":true,"baz":false}',
            }),
        );
        expect((await request).status).toEqual(200);
    });

    it('should issue PATCH requests', async () => {
        window.fetch = jasmine
            .createSpy('fetch')
            .and.returnValue(Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve({}) }));

        const request = apiService.patch('foo', { bar: true });
        expect(window.fetch).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'patch',
                headers: {
                    authorization: 'Bearer ',
                    'content-type': 'application/json',
                },
                body: '{"bar":true}',
            }),
        );
        expect((await request).status).toEqual(200);
    });

    it('should issue DELETE requests', async () => {
        window.fetch = jasmine
            .createSpy('fetch')
            .and.returnValue(Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve({}) }));

        const request = apiService.delete('foo');
        expect(window.fetch).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'delete',
                headers: {
                    authorization: 'Bearer ',
                },
            }),
        );
        expect((await request).status).toEqual(200);
    });
});
