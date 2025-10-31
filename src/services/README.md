# TOB Identity API Services

This directory contains TypeScript services generated from the TOB Consulting Identity API Swagger specification.

## Overview

All API services are automatically configured with MSAL authentication and will acquire access tokens before making requests.

## Services

- **RolesService**: Manage roles and permissions
- **TenantsService**: Manage tenant organizations
- **UsersService**: Manage user accounts
- **UserRolesService**: Assign and manage user role assignments

## Usage

### 1. Initialize Services

```typescript
import { useMsal } from '@azure/msal-react';
import { createApiServices } from './services';

function MyComponent() {
  const { instance } = useMsal();

  // Initialize all services
  const apiServices = createApiServices(instance);

  // Access individual services
  const { users, roles, tenants, userRoles } = apiServices;
}
```

### 2. Using Services

#### Get Current User

```typescript
const currentUser = await apiServices.users.getCurrentUser();
console.log(currentUser.firstName, currentUser.lastName);
```

#### Get All Roles

```typescript
const roles = await apiServices.roles.getAllRoles();
roles.forEach(role => console.log(role.roleName));
```

#### Create a New User

```typescript
import { CreateUserRequest } from '../types';

const newUser: CreateUserRequest = {
  tenantId: 'your-tenant-id',
  userName: 'jdoe',
  password: 'SecurePassword123!',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  mobilePhone: '555-1234'
};

const createdUser = await apiServices.users.createUser(newUser);
```

#### Get All Tenants

```typescript
const tenants = await apiServices.tenants.getAllTenants();
tenants.forEach(tenant => console.log(tenant.tenantName));
```

#### Update a User

```typescript
import { UpdateUserRequest } from '../types';

const updateData: UpdateUserRequest = {
  userId: 'user-id',
  tenantId: 'tenant-id',
  firstName: 'Jane',
  lastName: 'Smith',
  mobilePhone: '555-5678'
};

await apiServices.users.updateUser('user-id', updateData);
```

#### Assign User to Role

```typescript
import { CreateUserRoleRequest } from '../types';

const roleAssignment: CreateUserRoleRequest = {
  userId: 'user-id',
  roleId: 'role-id'
};

await apiServices.userRoles.assignUserToRole('user-id', roleAssignment);
```

## Error Handling

All services throw errors when requests fail. Wrap calls in try-catch blocks:

```typescript
try {
  const user = await apiServices.users.getUserById('user-id');
  console.log(user);
} catch (error) {
  console.error('Failed to fetch user:', error.message);
}
```

## Authentication

The services automatically handle MSAL authentication:

1. Attempts silent token acquisition first
2. Falls back to interactive popup if silent acquisition fails
3. Includes the Bearer token in all API requests

## API Base URL

The API base URL is configured in `apiClient.ts`:

```typescript
const API_BASE_URL = 'https://as-identity-api-prod-eastus2.azurewebsites.net';
```

## TypeScript Types

All request and response types are available in `src/types/index.ts`:

```typescript
import {
  UserDto,
  CreateUserRequest,
  UpdateUserRequest,
  TenantDto,
  RoleDto,
  State
} from '../types';
```

## Service Methods

### RolesService

- `createRole(role: RoleDto): Promise<RoleDto>`
- `getAllRoles(): Promise<RoleDto[]>`
- `updateRole(roleId: string, role: RoleDto): Promise<void>`
- `deleteRole(roleId: string): Promise<void>`

### TenantsService

- `createTenant(tenant: CreateTenantRequest): Promise<TenantDto>`
- `getAllTenants(): Promise<TenantDto[]>`
- `getTenantById(tenantId: string): Promise<TenantDto>`
- `updateTenant(tenantId: string, tenant: UpdateTenantRequest): Promise<void>`
- `deleteTenant(tenantId: string): Promise<void>`

### UsersService

- `getCurrentUser(): Promise<UserDto>`
- `doesUserNameExist(userName: string): Promise<boolean>`
- `createUser(user: CreateUserRequest): Promise<UserDto>`
- `getUsersByTenantId(tenantId?: string): Promise<UserDto[]>`
- `getUserById(userId: string): Promise<UserDto>`
- `updateUser(userId: string, user: UpdateUserRequest): Promise<void>`
- `deleteUser(userId: string): Promise<void>`

### UserRolesService

- `getUserRoles(userId: string): Promise<RoleDto[]>`
- `assignUserToRole(userId: string, roleRequest: CreateUserRoleRequest): Promise<boolean[]>`
