import { RoleDto } from './RoleDto';

export interface UpdateUserRequest {
  userId: string;
  tenantId: string;
  managerId?: string | null;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  maxQuoteAmount?: number | null;
  roles?: RoleDto[] | null;
}
