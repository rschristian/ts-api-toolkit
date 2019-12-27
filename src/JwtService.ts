export class JwtService {
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
