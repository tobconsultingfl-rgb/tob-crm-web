import { ApiClient } from './apiClient';
import { UserDto, CreateUserRequest, UpdateUserRequest } from '../types';

export class UsersService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Get the currently logged in user
   * @returns Current user data
   */
  async getCurrentUser(): Promise<UserDto> {
    return this.apiClient.get<UserDto>('/users/me');
  }

  /**
   * Check if a username exists
   * @param userName - Username to check
   * @returns True if username exists
   */
  async doesUserNameExist(userName: string): Promise<boolean> {
    return this.apiClient.get<boolean>(`/users/usernameexists/${userName}`);
  }

  /**
   * Creates a new user
   * @param user - User data to create
   * @returns Created user
   */
  async createUser(user: CreateUserRequest): Promise<UserDto> {
    return this.apiClient.post<UserDto>('/users', user);
  }

  /**
   * Get users by tenant ID
   * @param tenantId - Optional tenant ID filter
   * @returns Array of users
   */
  async getUsersByTenantId(tenantId?: string): Promise<UserDto[]> {
    const endpoint = tenantId ? `/users?TenantId=${tenantId}` : '/users';
    return this.apiClient.get<UserDto[]>(endpoint);
  }

  /**
   * Get user by ID
   * @param userId - User ID
   * @returns User data
   */
  async getUserById(userId: string): Promise<UserDto> {
    return this.apiClient.get<UserDto>(`/users/${userId}`);
  }

  /**
   * Updates a user
   * @param userId - User ID to update
   * @param user - Updated user data
   */
  async updateUser(userId: string, user: UpdateUserRequest): Promise<void> {
    await this.apiClient.put<void>(`/users/${userId}`, user);
  }

  /**
   * Deletes (deactivates) a user
   * @param userId - User ID to delete
   */
  async deleteUser(userId: string): Promise<void> {
    await this.apiClient.delete<void>(`/users/${userId}`);
  }
}
