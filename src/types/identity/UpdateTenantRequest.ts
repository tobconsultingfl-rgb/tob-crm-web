import { State } from './State';

export interface UpdateTenantRequest {
  tenantName: string;
  tenantAddress1: string;
  tenantAddress2?: string;
  tenantCity: string;
  tenantState: State;
  tenantZip: string;
  tenantPhoneNumber: string;
  tenantFax?: string;
  contactFirstName: string;
  contactLastName: string;
  contactMobilePhone: string;
  contactEmail: string;
}
