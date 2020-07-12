import { authStorageService } from '../src/index';
import { AuthStorageService } from '../src/AuthStorageService';

const exampleJwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp' +
    'vaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

describe('Auth Storage Service Tests', () => {
    it('should pass basic smoke test', () => {
        expect(authStorageService).toBeInstanceOf(AuthStorageService);
    });

    /**
     * @deprecated Will be removed in v3.0.0.
     */
    it('should be able to update a token key', () => {
        const authStorageServiceDuplicate = new AuthStorageService();
        const key = 'nonDefaultTokenKey';
        authStorageServiceDuplicate.updateTokenKey(key);
        authStorageServiceDuplicate.saveToken(exampleJwt);
        expect(localStorage[Object.keys(localStorage)[0]]).toBe(exampleJwt);
    });

    it('should be able to change a token key', () => {
        const authStorageServiceDuplicate = new AuthStorageService();
        const key = 'nonDefaultTokenKey';
        authStorageServiceDuplicate.changeTokenKey(key);
        authStorageServiceDuplicate.saveToken(exampleJwt);
        expect(localStorage[Object.keys(localStorage)[0]]).toBe(exampleJwt);
    });

    it('should be able to retrieve a token', () => {
        expect(authStorageService.getToken()).toBe('');
    });

    it('should be able to save a token', () => {
        authStorageService.saveToken(exampleJwt);
        expect(authStorageService.getToken()).toBe(exampleJwt);
    });

    it('should be able to delete a token', () => {
        authStorageService.saveToken(exampleJwt);
        expect(authStorageService.getToken()).toBe(exampleJwt);
        authStorageService.destroyToken();
        expect(authStorageService.getToken()).toBe('');
    });
});
