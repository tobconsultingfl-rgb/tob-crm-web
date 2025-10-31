import { IPublicClientApplication } from '@azure/msal-browser';

export class ApiClient {
  private msalInstance: IPublicClientApplication;
  private apiScopes: string[];
  private baseUrl: string;

  constructor(
    msalInstance: IPublicClientApplication,
    baseUrl: string,
    apiScopes: string[] = ['User.Read']
  ) {
    this.msalInstance = msalInstance;
    this.baseUrl = baseUrl;
    this.apiScopes = apiScopes;
  }

  private async getAccessToken(): Promise<string> {
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      throw new Error('No active account. Please sign in.');
    }

    try {
      const response = await this.msalInstance.acquireTokenSilent({
        scopes: this.apiScopes,
        account: accounts[0],
      });
      return response.accessToken;
    } catch (error) {
      // If silent acquisition fails, try interactive
      const response = await this.msalInstance.acquireTokenPopup({
        scopes: this.apiScopes,
      });
      return response.accessToken;
    }
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAccessToken();

    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.title || errorData?.detail || `HTTP ${response.status}: ${response.statusText}`);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const token = await this.getAccessToken();

    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.title || errorData?.detail || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}
