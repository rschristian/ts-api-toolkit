# ts-api-toolkit
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

<p align="center">
  <img src="https://github.com/ryanchristian4427/ts-api-toolkit/blob/master/media/carbon.svg?raw=true">
</p>
<br/><br/>

A simple wrapper around Axios in combination with Json Web Token Handling to easily communicate with an API, with or without authorization.

As I copy my API and JWT services from project to project, it made sense to provide a combined toolkit to reduce the amount of copied code.

There are no set plans for future updates.

## Getting Started

These instructions will get you up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software:

```
Node/NPM
```

### Running

This package has two class instance exports: `apiService` and `authStorageService`.

- ApiService
    - `changeApiUrl(newUrl: string): void`
        - Changes the base url. Default is set to '/api/v1', and assumes a proxy is set to figure out the host. Use a partial route like '/api' if you're using a proxy, otherwise, use this to set a full route like 'http://example.com/api'.
        
    - `changeAuthSchema(newSchema: string): void`
        - Changes the schema used in the authorization header. Default is set to 'Bearer'.
        
    - `query(resource: string, params: { params: object }): Promise<any>`
        - GET request with parameters.
        
    - `get(resource: string, slug = ''): Promise<any>`
        - GET request without parameters. Optional slug.
        
    - `post(resource: string, params: object): Promise<any>`
        - POST request.
        
    - `update(resource: string, slug: string, params: object): Promise<any>`
        - PUT request with a non-optional slug.
        
    - `put(resource: string, params: object): Promise<any>`
        - PUT request.
        
    - `delete(resource: string): Promise<any>`
        - DELETE request.
        
    All requests use the Authorization header to send the current token in localStorage, regardless of whether or not it is null.

- AuthStorageService
    - `updateTokenKey(tokenKey: string): void`
        - Changes the key used to identify the token within localStorage. Default set to 'jwt'.
        
    - `getToken(): string`
        - Returns the current token.
        
    - `saveToken(token: string): void`
        - Save a token into localStorage, overwriting the value that is there, if a value does exist.
        
    - `destroyToken(): void`
        - Removes the current token in localStorage.
