import apiToolkit from '../src';
import { jwt, populateStorage } from './utils';

describe('Api Request Tests', () => {
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

    it('should issues reqs using full setup', async () => {
        apiToolkit('foo', 'post', { headers: { foo: 'bar' } }, { bar: true });

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'post',
                headers: {
                    authorization: `Bearer ${jwt}`,
                    'content-type': 'application/json',
                    foo: 'bar',
                },
                body: '{"bar":true}',
            })
        );
        expect(fetchMock).toHaveBeenCalledTimes(1); 
    });

    it('should not attach auth header when jwt empty', async () => {
        apiToolkit.destroyToken();

        apiToolkit.get('foo');
        expect(fetchMock).not.toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                headers: {
                    authorization: `Bearer ${jwt}`,
                },
            })
        );
        expect(fetchMock).toHaveBeenCalledTimes(1); 
    });

    it('should issue reqs with query parameters', async () => {
        const params = { bar: 'baz' };
        const req = apiToolkit.get('foo', { params });

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo?bar=baz',
            jasmine.objectContaining({
                headers: {
                    authorization: `Bearer ${jwt}`,
                },
            }),
        );
        expect((await req).status).toEqual(200);
    });

    it('should issue GET reqs', async () => {
        const req = apiToolkit.get('foo/bar');

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo/bar',
            jasmine.objectContaining({
                method: 'get',
                headers: {
                    authorization: `Bearer ${jwt}`,
                },
            }),
        );
        expect((await req).status).toEqual(200);
    });

    it('should issue DELETE reqs', async () => {
        const req = apiToolkit.delete('foo');

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'delete',
                headers: {
                    authorization: `Bearer ${jwt}`,
                },
            }),
        );
        expect((await req).status).toEqual(200);
    });

    it('should issue HEAD reqs', async () => {
        const req = apiToolkit.head('foo');

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'head',
                headers: {
                    authorization: `Bearer ${jwt}`,
                },
            }),
        );
        expect((await req).status).toEqual(200);
    });

    it('should issue OPTIONS reqs', async () => {
        const req = apiToolkit.options('foo');

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'options',
                headers: {
                    authorization: `Bearer ${jwt}`,
                },
            }),
        );
        expect((await req).status).toEqual(200);
    });

    it('should issue POST reqs', async () => {
        const req = apiToolkit.post('foo', { bar: true });

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'post',
                headers: {
                    authorization: `Bearer ${jwt}`,
                    'content-type': 'application/json',
                },
                body: '{"bar":true}',
            }),
        );
        expect((await req).status).toEqual(200);
    });

    it('should issue PUT reqs', async () => {
        const req = apiToolkit.put('foo', { bar: true, baz: false });

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'put',
                headers: {
                    authorization: `Bearer ${jwt}`,
                    'content-type': 'application/json',
                },
                body: '{"bar":true,"baz":false}',
            }),
        );
        expect((await req).status).toEqual(200);
    });

    it('should issue PATCH reqs', async () => {
        const req = apiToolkit.patch('foo', { bar: true });

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/foo',
            jasmine.objectContaining({
                method: 'patch',
                headers: {
                    authorization: `Bearer ${jwt}`,
                    'content-type': 'application/json',
                },
                body: '{"bar":true}',
            }),
        );
        expect((await req).status).toEqual(200);
    }); 
});
