import { ApiClient } from './apiClient';
import { TenantDto, CreateTenantRequest, UpdateTenantRequest } from '../types';

export class TenantsService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Creates a new tenant
   * @param tenant - Tenant data to create
   * @returns Created tenant
   */
  async createTenant(tenant: CreateTenantRequest): Promise<TenantDto> {
    const formData = new FormData();
    formData.append('TenantName', tenant.tenantName);
    formData.append('TenantAddress1', tenant.tenantAddress1);
    if (tenant.tenantAddress2) formData.append('TenantAddress2', tenant.tenantAddress2);
    formData.append('TenantCity', tenant.tenantCity);
    formData.append('TenantState', tenant.tenantState);
    formData.append('TenantZip', tenant.tenantZip);
    formData.append('TenantPhoneNumber', tenant.tenantPhoneNumber);
    if (tenant.tenantFax) formData.append('TenantFax', tenant.tenantFax);
    formData.append('ContactFirstName', tenant.contactFirstName);
    formData.append('ContactLastName', tenant.contactLastName);
    formData.append('ContactMobilePhone', tenant.contactMobilePhone);
    formData.append('ContactEmail', tenant.contactEmail);
    formData.append('Password', tenant.password);

    return this.apiClient.postFormData<TenantDto>('/tenants', formData);
  }

  /**
   * Get all tenants
   * @returns Array of all tenants
   */
  async getAllTenants(): Promise<TenantDto[]> {
    return this.apiClient.get<TenantDto[]>('/tenants');
  }

  /**
   * Get tenant by ID
   * @param tenantId - Tenant ID
   * @returns Tenant data
   */
  async getTenantById(tenantId: string): Promise<TenantDto> {
    return this.apiClient.get<TenantDto>(`/tenants/${tenantId}`);
  }

  /**
   * Updates an existing tenant
   * @param tenantId - Tenant ID to update
   * @param tenant - Updated tenant data
   */
  async updateTenant(tenantId: string, tenant: UpdateTenantRequest): Promise<void> {
    await this.apiClient.put<void>(`/tenants/${tenantId}`, tenant);
  }

  /**
   * Deletes (deactivates) a tenant
   * @param tenantId - Tenant ID to delete
   */
  async deleteTenant(tenantId: string): Promise<void> {
    await this.apiClient.delete<void>(`/tenants/${tenantId}`);
  }
}
