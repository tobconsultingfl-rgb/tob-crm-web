/**
 * Example: How to use the generated API services in React components
 */

import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { createApiServices } from './index';
import { UserDto, TenantDto, RoleDto } from '../types';

/**
 * Example 1: Fetch and display current user
 */
export function CurrentUserExample() {
  const { instance } = useMsal();
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const apiServices = createApiServices(instance);
        const currentUser = await apiServices.users.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [instance]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>Current User</h2>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Tenant: {user.tenantName}</p>
    </div>
  );
}

/**
 * Example 2: Fetch and display all tenants
 */
export function TenantsListExample() {
  const { instance } = useMsal();
  const [tenants, setTenants] = useState<TenantDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const apiServices = createApiServices(instance);
        const allTenants = await apiServices.tenants.getAllTenants();
        setTenants(allTenants);
      } catch (err) {
        console.error('Failed to fetch tenants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, [instance]);

  if (loading) return <div>Loading tenants...</div>;

  return (
    <div>
      <h2>Tenants</h2>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.tenantId}>
            {tenant.tenantName} - {tenant.tenantCity}, {tenant.tenantState}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Example 3: Create a custom hook for API services
 */
export function useApiServices() {
  const { instance } = useMsal();
  return createApiServices(instance);
}

/**
 * Example 4: Using the custom hook
 */
export function RolesListExample() {
  const apiServices = useApiServices();
  const [roles, setRoles] = useState<RoleDto[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const allRoles = await apiServices.roles.getAllRoles();
        setRoles(allRoles);
      } catch (err) {
        console.error('Failed to fetch roles:', err);
      }
    };

    fetchRoles();
  }, [apiServices]);

  return (
    <div>
      <h2>Roles</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.roleId}>
            {role.roleName}
            {role.permissions && (
              <ul>
                {role.permissions.map((perm) => (
                  <li key={perm.permissionId}>{perm.permissionName}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Example 5: Create a user with form submission
 */
export function CreateUserForm() {
  const apiServices = useApiServices();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setSubmitting(true);
      const newUser = await apiServices.users.createUser({
        tenantId: formData.get('tenantId') as string,
        userName: formData.get('userName') as string,
        password: formData.get('password') as string,
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        mobilePhone: formData.get('mobilePhone') as string,
      });
      console.log('User created:', newUser);
      alert('User created successfully!');
    } catch (err) {
      console.error('Failed to create user:', err);
      alert('Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="tenantId" placeholder="Tenant ID" required />
      <input name="userName" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <input name="firstName" placeholder="First Name" required />
      <input name="lastName" placeholder="Last Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="mobilePhone" placeholder="Mobile Phone" required />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}

/**
 * Example 6: React Context for global API services
 */
import { createContext, useContext, ReactNode } from 'react';
import { ApiServices } from './index';

const ApiServicesContext = createContext<ApiServices | null>(null);

export function ApiServicesProvider({ children }: { children: ReactNode }) {
  const { instance } = useMsal();
  const apiServices = createApiServices(instance);

  return (
    <ApiServicesContext.Provider value={apiServices}>
      {children}
    </ApiServicesContext.Provider>
  );
}

export function useApiServicesContext() {
  const context = useContext(ApiServicesContext);
  if (!context) {
    throw new Error('useApiServicesContext must be used within ApiServicesProvider');
  }
  return context;
}

/**
 * Example 7: Using services with React Query (if you have it installed)
 */
// import { useQuery, useMutation } from '@tanstack/react-query';
//
// export function useCurrentUser() {
//   const apiServices = useApiServices();
//   return useQuery({
//     queryKey: ['currentUser'],
//     queryFn: () => apiServices.users.getCurrentUser(),
//   });
// }
//
// export function useCreateUser() {
//   const apiServices = useApiServices();
//   return useMutation({
//     mutationFn: (userData: CreateUserRequest) =>
//       apiServices.users.createUser(userData),
//   });
// }
