import apiToolkit from '../src';
import { jwt, populateStorage } from './utils';

describe('Config Tests', () => {
    let fetchMock: jasmine.Spy;
    beforeEach(() => {
        populateStorage();
        fetchMock = window.fetch = jasmine.createSpy('fetch').and.returnValue(
            Promise.resolve({
                ok: true,
                status: 200,
                text: () => Promise.resolve('foo bar baz')
            })
        );
    });

    it('should be able to configure the token key', () => {
        const newTokenKey = 'token';
        const apiService = apiToolkit.create({ tokenKey: newTokenKey });
        apiService.saveToken(jwt);
        expect(localStorage.getItem(newTokenKey)).toBeTruthy();
        localStorage.removeItem(newTokenKey);
    });

    it('should be able to configure the base URL', () => {
        const apiService = apiToolkit.create({ baseUrl: '/api/v2' });
        apiService.get('foo');

        expect(fetchMock).toHaveBeenCalledWith('/api/v2/foo', jasmine.anything());
    });

    it('should be able to configure the auth schema', () => {
        const apiService = apiToolkit.create({ authSchema: 'Basic' });

        apiService.get('foo');
        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                headers: {
                    authorization: `Basic ${jwt}`,
                },
            }),
        );
    });

    it('should be able to add headers', () => {
        apiToolkit.get('foo', { headers: { foo: 'bar' } });

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                headers: {
                    authorization: `Bearer ${jwt}`,
                    foo: 'bar',
                },
            }),
        );
    });
});
