import { PermissionDto } from './PermissionDto';

export interface RoleDto {
  roleId?: string | null;
  roleName?: string | null;
  permissions?: PermissionDto[] | null;
}
