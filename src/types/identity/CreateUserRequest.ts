import { RoleDto } from './RoleDto';

export interface CreateUserRequest {
  tenantId: string;
  managerId?: string | null;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  roles?: RoleDto[] | null;
}
