<div align="center">
  <img src="https://github.com/ryanchristian4427/ts-api-toolkit/blob/master/media/carbon.svg?raw=true" alt="TS-API-Toolkit Demo" width="600" />
</div>

<h1 align="center">TS-API-Toolkit</h1>

<div align="center">
    <a href="https://www.npmjs.com/package/ts-api-toolkit">
        <img alt="NPM" src="https://img.shields.io/npm/l/ts-api-toolkit?color=brightgreen">
    </a>
    <a href="https://bundlephobia.com/result?p=ts-api-toolkit">
        <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/ts-api-toolkit">
    </a>
</div>

<br />

TS-API-Toolkit is a simple way to handle your API calls as well as your localStorage JWT management. The library offers a simple wrapper around [redaxios](https://github.com/developit/redaxios) in conjunction with a service to handle your JWTs. No longer will you need to attach tokens to every request or even manually worry about them. Just set the token, and it'll be attached to every call you make.

## Install

```
$ yarn add ts-api-toolkit
```

## Usage

```js
import apiToolkit from 'ts-api-toolkit';

const { data: { user } } = await apiToolkit.post('users/login', credentials);
authStorageService.saveToken(user.token);
```

## API

This library offers two class instance exports, `ApiSerivce` and `AuthStorageService`. Using these you can easily handle your application.

### import { authStorageService } from 'ts-api-toolkit'
Provides an instance of AuthStorageService. 

  - #### .changeTokenKey(tokenKey: string): void
    Changes the key your token is stored under in localStorage.
    
    The token key is what identifies your token as it is saved in a browser's localStorage. The value from that key is attached to every API request.

  - #### .getToken(): string
    Retrieves the current value for your token key. If a value cannot be found, returns an empty string. 

  - #### .saveToken(token: string): void
    Saves a provided token into localStorage using the tokenKey.
    
    The token you save will be used with all future API requests, until it is removed or changed.

  - #### .destroyToken(): void
    Removes the currently stored token key and value.

<br/>

### import { apiService } from 'ts-api-toolkit'
Provides an instance of ApiService.

  - #### .changeBaseUrl(baseUrl: string): void
    Changes the base URL to use when making requests.
    
    Use the `baseUrl` parameter to describe your base API URL. Use a partial route like `/api` if you want to use a proxy, otherwise, set the full route to your API like `http://example.com/api`. The default `baseUrl` is `/api/v1`.

  - #### .changeAuthSchema(authSchema: string): void
    Changes the scheme used in the Authorization header. 
    
    Use the `authSchema` parameter to describe the prefix to the token. The default is set to `Bearer`, so, unedited, all API requests will come with the following header: `Authorization: 'Bearer <auth-token>'`
   
  - #### .get(resource: string, params?: Record<string, unknown>): Promise<any>
    GET request
    
  - #### .post(resource: string, data: Record<string, unknown>, params?: Record<string, unknown>): Promise<any>
    POST request
    
  - #### .put(resource: string, data: Record<string, unknown>, params?: Record<string, unknown>): Promise<any>
    PUT request
    
  - #### .patch(resource: string, data: Record<string, unknown>, params?: Record<string, unknown>): Promise<any>
    PATCH request

  - #### .delete(resource: string, params: Record<string, unknown>, params?: Record<string, unknown>): Promise<any>
    DELETE request
    
  - #### .options(resource: string, params?: Record<string, unknown>): Promise<any>
    OPTIONS request

  All requests use the Authorization header to send the current token in localStorage, regardless of whether it is empty.
  
  Query parameters will all be properly serialized, no need to provide anything beyond an object.
  
    `{ name: 'ferret', color: 'purple' }` -> `?name=ferret&color=purple`

## License

MIT © Ryan Christian
