import { IPublicClientApplication } from '@azure/msal-browser';
import { ApiClient } from './apiClient';
import { RolesService } from './rolesService';
import { TenantsService } from './tenantsService';
import { UsersService } from './usersService';
import { UserRolesService } from './userRolesService';
import { LeadsService } from './leadsService';
import { LeadActivitiesService } from './leadActivitiesService';

export { ApiClient } from './apiClient';
export { RolesService } from './rolesService';
export { TenantsService } from './tenantsService';
export { UsersService } from './usersService';
export { UserRolesService } from './userRolesService';
export { LeadsService } from './leadsService';
export { LeadActivitiesService } from './leadActivitiesService';

// API Base URLs
const IDENTITY_API_BASE_URL = 'https://as-identity-api-prod-eastus2.azurewebsites.net';
const LEADS_API_BASE_URL = 'https://as-leads-api-prod-eastus2.azurewebsites.net';

/**
 * Service factory to create all API services with MSAL authentication
 */
export class ApiServices {
  // Identity API Services
  public roles: RolesService;
  public tenants: TenantsService;
  public users: UsersService;
  public userRoles: UserRolesService;

  // Leads API Services
  public leads: LeadsService;
  public leadActivities: LeadActivitiesService;

  constructor(msalInstance: IPublicClientApplication, apiScopes: string[] = ['User.Read']) {
    // Initialize Identity API client and services
    const identityApiClient = new ApiClient(msalInstance, IDENTITY_API_BASE_URL, apiScopes);
    this.roles = new RolesService(identityApiClient);
    this.tenants = new TenantsService(identityApiClient);
    this.users = new UsersService(identityApiClient);
    this.userRoles = new UserRolesService(identityApiClient);

    // Initialize Leads API client and services
    const leadsApiClient = new ApiClient(msalInstance, LEADS_API_BASE_URL, apiScopes);
    this.leads = new LeadsService(leadsApiClient);
    this.leadActivities = new LeadActivitiesService(leadsApiClient);
  }
}

/**
 * Factory function to create API services
 * @param msalInstance - MSAL instance from the app
 * @param apiScopes - API scopes for token acquisition
 * @returns Initialized API services
 */
export const createApiServices = (
  msalInstance: IPublicClientApplication,
  apiScopes: string[] = ['User.Read']
): ApiServices => {
  return new ApiServices(msalInstance, apiScopes);
};
