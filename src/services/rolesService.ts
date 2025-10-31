import { ApiClient } from './apiClient';
import { RoleDto } from '../types';

export class RolesService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Creates a new role
   * @param role - Role data to create
   * @returns Created role
   */
  async createRole(role: RoleDto): Promise<RoleDto> {
    return this.apiClient.post<RoleDto>('/roles', role);
  }

  /**
   * Get all roles
   * @returns Array of all roles
   */
  async getAllRoles(): Promise<RoleDto[]> {
    return this.apiClient.get<RoleDto[]>('/roles');
  }

  /**
   * Updates a role
   * @param roleId - Role ID to update
   * @param role - Updated role data
   */
  async updateRole(roleId: string, role: RoleDto): Promise<void> {
    await this.apiClient.put<void>(`/roles/${roleId}`, role);
  }

  /**
   * Deletes (deactivates) a role
   * @param roleId - Role ID to delete
   */
  async deleteRole(roleId: string): Promise<void> {
    await this.apiClient.delete<void>(`/roles/${roleId}`);
  }
}
