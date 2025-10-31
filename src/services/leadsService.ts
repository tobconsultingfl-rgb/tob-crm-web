import { ApiClient } from './apiClient';
import {
  LeadDto,
  CreateLeadCommand,
  UpdateLeadCommand,
  GetLeadsQueryParams,
} from '../types/leads.types';

export class LeadsService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Get all leads with optional filters
   * @param params - Query parameters for filtering leads
   * @returns Array of leads
   */
  async getLeads(params?: GetLeadsQueryParams): Promise<LeadDto[]> {
    const queryParams = new URLSearchParams();
    if (params?.tenantId) queryParams.append('TenantId', params.tenantId);
    if (params?.name) queryParams.append('Name', params.name);
    if (params?.status) queryParams.append('Status', params.status);
    if (params?.pageNumber) queryParams.append('PageNumber', params.pageNumber.toString());
    if (params?.pageSize) queryParams.append('PageSize', params.pageSize.toString());
    if (params?.includeDeleted !== undefined) queryParams.append('IncludeDeleted', params.includeDeleted.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/Leads?${queryString}` : '/api/Leads';

    return this.apiClient.get<LeadDto[]>(endpoint);
  }

  /**
   * Get a lead by ID
   * @param id - Lead ID
   * @param tenantId - Optional tenant ID filter
   * @returns Lead data
   */
  async getLeadById(id: string, tenantId?: string): Promise<LeadDto> {
    const queryString = tenantId ? `?tenantId=${tenantId}` : '';
    return this.apiClient.get<LeadDto>(`/api/Leads/${id}${queryString}`);
  }

  /**
   * Create a new lead
   * @param command - Create lead command
   * @returns Created lead
   */
  async createLead(command: CreateLeadCommand): Promise<LeadDto> {
    return this.apiClient.post<LeadDto>('/api/Leads', command);
  }

  /**
   * Update an existing lead
   * @param id - Lead ID to update
   * @param command - Update lead command
   * @returns Updated lead
   */
  async updateLead(id: string, command: UpdateLeadCommand): Promise<LeadDto> {
    return this.apiClient.put<LeadDto>(`/api/Leads/${id}`, command);
  }

  /**
   * Delete a lead
   * @param id - Lead ID to delete
   * @param tenantId - Optional tenant ID filter
   */
  async deleteLead(id: string, tenantId?: string): Promise<void> {
    const queryString = tenantId ? `?tenantId=${tenantId}` : '';
    await this.apiClient.delete<void>(`/api/Leads/${id}${queryString}`);
  }
}
