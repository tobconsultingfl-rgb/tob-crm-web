import { ApiClient } from './apiClient';
import {
  LeadActivityDto,
  CreateLeadActivityCommand,
  UpdateLeadActivityCommand,
  GetLeadActivitiesQueryParams,
} from '../types/leads.types';

export class LeadActivitiesService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Get all lead activities with optional filters
   * @param params - Query parameters for filtering activities
   * @returns Array of lead activities
   */
  async getLeadActivities(params?: GetLeadActivitiesQueryParams): Promise<LeadActivityDto[]> {
    const queryParams = new URLSearchParams();
    if (params?.tenantId) queryParams.append('TenantId', params.tenantId);
    if (params?.leadId) queryParams.append('LeadId', params.leadId);
    if (params?.activityType) queryParams.append('ActivityType', params.activityType);
    if (params?.pageNumber) queryParams.append('PageNumber', params.pageNumber.toString());
    if (params?.pageSize) queryParams.append('PageSize', params.pageSize.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/LeadActivities?${queryString}` : '/api/LeadActivities';

    return this.apiClient.get<LeadActivityDto[]>(endpoint);
  }

  /**
   * Get a lead activity by ID
   * @param id - Activity ID
   * @param tenantId - Optional tenant ID filter
   * @returns Lead activity data
   */
  async getLeadActivityById(id: string, tenantId?: string): Promise<LeadActivityDto> {
    const queryString = tenantId ? `?tenantId=${tenantId}` : '';
    return this.apiClient.get<LeadActivityDto>(`/api/LeadActivities/${id}${queryString}`);
  }

  /**
   * Create a new lead activity
   * @param command - Create lead activity command
   * @param tenantId - Optional tenant ID
   * @returns Created lead activity
   */
  async createLeadActivity(command: CreateLeadActivityCommand, tenantId?: string): Promise<LeadActivityDto> {
    const queryString = tenantId ? `?tenantId=${tenantId}` : '';
    return this.apiClient.post<LeadActivityDto>(`/api/LeadActivities${queryString}`, command);
  }

  /**
   * Update an existing lead activity
   * @param id - Activity ID to update
   * @param command - Update lead activity command
   * @param tenantId - Optional tenant ID filter
   * @returns Updated lead activity
   */
  async updateLeadActivity(id: string, command: UpdateLeadActivityCommand, tenantId?: string): Promise<LeadActivityDto> {
    const queryString = tenantId ? `?tenantId=${tenantId}` : '';
    return this.apiClient.put<LeadActivityDto>(`/api/LeadActivities/${id}${queryString}`, command);
  }

  /**
   * Delete a lead activity
   * @param id - Activity ID to delete
   * @param tenantId - Optional tenant ID filter
   */
  async deleteLeadActivity(id: string, tenantId?: string): Promise<void> {
    const queryString = tenantId ? `?tenantId=${tenantId}` : '';
    await this.apiClient.delete<void>(`/api/LeadActivities/${id}${queryString}`);
  }
}
