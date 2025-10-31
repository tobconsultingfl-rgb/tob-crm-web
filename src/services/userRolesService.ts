import { ApiClient } from './apiClient';
import { RoleDto, CreateUserRoleRequest } from '../types';

export class UserRolesService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Get all roles for a specific user
   * @param userId - User ID
   * @returns Array of roles assigned to the user
   */
  async getUserRoles(userId: string): Promise<RoleDto[]> {
    return this.apiClient.get<RoleDto[]>(`/${userId}/roles`);
  }

  /**
   * Assigns a user to a role
   * @param userId - User ID
   * @param roleRequest - Role assignment request
   * @returns Array of boolean results
   */
  async assignUserToRole(userId: string, roleRequest: CreateUserRoleRequest): Promise<boolean[]> {
    return this.apiClient.patch<boolean[]>(`/${userId}/roles`, roleRequest);
  }
}
