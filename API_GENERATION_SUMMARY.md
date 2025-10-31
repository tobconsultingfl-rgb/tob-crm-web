# API Generation Summary

This document summarizes the TypeScript types and services generated from the TOB Consulting Identity API Swagger specification.

## Source

- **API URL**: `https://as-identity-api-prod-eastus2.azurewebsites.net`
- **Swagger Spec**: `https://as-identity-api-prod-eastus2.azurewebsites.net/swagger/v1/swagger.json`
- **API Version**: v1

## Generated Files

### Types (`src/types/`)

**File**: `src/types/index.ts`

All TypeScript type definitions generated from the Swagger schemas:

#### Enums
- `State` - US state abbreviations (AL, AK, AR, etc.)

#### DTOs (Data Transfer Objects)
- `PermissionDto` - Permission information
- `RoleDto` - Role with associated permissions
- `UserDto` - Complete user profile
- `TenantDto` - Tenant organization information

#### Request Models
- `CreateUserRequest` - Payload for creating a new user
- `UpdateUserRequest` - Payload for updating an existing user
- `CreateUserRoleRequest` - Payload for assigning roles to users
- `CreateTenantRequest` - Payload for creating a new tenant
- `UpdateTenantRequest` - Payload for updating an existing tenant

#### Error Models
- `ProblemDetails` - Standard error response
- `ValidationProblemDetails` - Validation error response with field-level errors

### Services (`src/services/`)

All services are configured with automatic MSAL authentication.

#### Base API Client

**File**: `src/services/apiClient.ts`

The `ApiClient` class provides:
- Automatic MSAL token acquisition (silent with fallback to interactive)
- Bearer token authentication for all requests
- HTTP methods: GET, POST, PUT, PATCH, DELETE
- FormData support for multipart/form-data endpoints
- Error handling with proper error messages

#### Roles Service

**File**: `src/services/rolesService.ts`

**Methods**:
- `createRole(role: RoleDto): Promise<RoleDto>`
- `getAllRoles(): Promise<RoleDto[]>`
- `updateRole(roleId: string, role: RoleDto): Promise<void>`
- `deleteRole(roleId: string): Promise<void>`

**Endpoints**:
- `POST /roles` - Create a new role
- `GET /roles` - Get all roles
- `PUT /roles/{roleId}` - Update a role
- `DELETE /roles/{roleId}` - Delete (deactivate) a role

#### Tenants Service

**File**: `src/services/tenantsService.ts`

**Methods**:
- `createTenant(tenant: CreateTenantRequest): Promise<TenantDto>`
- `getAllTenants(): Promise<TenantDto[]>`
- `getTenantById(tenantId: string): Promise<TenantDto>`
- `updateTenant(tenantId: string, tenant: UpdateTenantRequest): Promise<void>`
- `deleteTenant(tenantId: string): Promise<void>`

**Endpoints**:
- `POST /tenants` - Create a new tenant (multipart/form-data)
- `GET /tenants` - Get all tenants
- `GET /tenants/{tenantId}` - Get tenant by ID
- `PUT /tenants/{tenantId}` - Update a tenant
- `DELETE /tenants/{tenantId}` - Delete (deactivate) a tenant

#### Users Service

**File**: `src/services/usersService.ts`

**Methods**:
- `getCurrentUser(): Promise<UserDto>`
- `doesUserNameExist(userName: string): Promise<boolean>`
- `createUser(user: CreateUserRequest): Promise<UserDto>`
- `getUsersByTenantId(tenantId?: string): Promise<UserDto[]>`
- `getUserById(userId: string): Promise<UserDto>`
- `updateUser(userId: string, user: UpdateUserRequest): Promise<void>`
- `deleteUser(userId: string): Promise<void>`

**Endpoints**:
- `GET /users/me` - Get currently logged-in user
- `GET /users/usernameexists/{userName}` - Check username availability
- `POST /users` - Create a new user
- `GET /users?TenantId={tenantId}` - Get users by tenant ID
- `GET /users/{userId}` - Get user by ID
- `PUT /users/{userId}` - Update a user
- `DELETE /users/{userId}` - Delete (deactivate) a user

#### User Roles Service

**File**: `src/services/userRolesService.ts`

**Methods**:
- `getUserRoles(userId: string): Promise<RoleDto[]>`
- `assignUserToRole(userId: string, roleRequest: CreateUserRoleRequest): Promise<boolean[]>`

**Endpoints**:
- `GET /{userId}/roles` - Get all roles for a user
- `PATCH /{userId}/roles` - Assign a user to a role

#### Service Factory

**File**: `src/services/index.ts`

Exports:
- `ApiClient` - Base API client class
- `RolesService`, `TenantsService`, `UsersService`, `UserRolesService` - Individual services
- `ApiServices` - Container class with all services
- `createApiServices(msalInstance, apiScopes?)` - Factory function

## Usage Examples

See `src/services/example-usage.tsx` for comprehensive examples including:
- Basic service usage
- Custom React hooks
- React Context pattern
- Form submission
- Error handling
- React Query integration (commented)

## Documentation

- **Service Documentation**: `src/services/README.md`
- **Main README**: Updated with API services section

## Authentication

All API services use MSAL for authentication:
1. Services accept an `IPublicClientApplication` instance
2. Tokens are acquired automatically before each request
3. Silent acquisition is attempted first, with interactive fallback
4. Bearer tokens are included in all API requests

## Features

- ✅ Full TypeScript type safety
- ✅ Automatic MSAL authentication
- ✅ One service file per resource type
- ✅ Comprehensive JSDoc comments
- ✅ Error handling
- ✅ Support for all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- ✅ FormData support for multipart/form-data endpoints
- ✅ Factory pattern for easy initialization

## Build Verification

The application builds successfully with all generated types and services:

```bash
npm run build
```

Build output: ✓ 1084 modules transformed successfully
