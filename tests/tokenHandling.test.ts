import apiToolkit from '../src';
import { tokenKey, jwt, clearStorage } from './utils';

describe('Token Handling Tests', () => {
    beforeEach(clearStorage);

    it('should be able to retrieve a token', () => {
        expect(apiToolkit.getToken()).toBeNull();
        localStorage.setItem(tokenKey, jwt);
        expect(apiToolkit.getToken()).toBe(jwt);
    });

    it('should be able to save a token', () => {
        apiToolkit.saveToken(jwt);
        expect(localStorage.getItem(tokenKey)).toBe(jwt);
    });

    it('should be able to delete a token', () => {
        localStorage.setItem('jwt', jwt);
        apiToolkit.destroyToken();
        expect(localStorage.getItem(tokenKey)).toBeNull();
    });
});
