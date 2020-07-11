import { ApiService } from './ApiService';
import { AuthStorageService } from './AuthStorageService';

export const authStorageService = new AuthStorageService();
export const apiService = new ApiService(authStorageService);
