# TOB CRM

A modern CRM (Customer Relationship Management) application built with React, TypeScript, Redux, MSAL authentication, and Material UI.

## Features

- **Authentication**: Secure Microsoft authentication using MSAL (Microsoft Authentication Library)
- **State Management**: Redux Toolkit for predictable state management
- **Modern UI**: Material UI components with responsive design
- **CRM Modules**:
  - Dashboard: Overview with key metrics and statistics
  - Leads: Manage potential customers
  - Accounts: Track customer organizations
  - Opportunities: Monitor sales pipeline

## Tech Stack

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **MSAL** for Microsoft Azure AD authentication
- **Material UI** for component library
- **Vite** for fast development and building

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Azure AD application registration (for authentication)

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd tob-crm-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Azure AD Authentication

To enable authentication, you need to configure Azure AD:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Active Directory > App registrations
3. Click "New registration"
4. Enter application details:
   - Name: TOB CRM
   - Supported account types: Choose appropriate option
   - Redirect URI: Web - http://localhost:5173
5. After registration, note the **Application (client) ID** and **Directory (tenant) ID**

### 4. Update Authentication Configuration

Edit `src/config/authConfig.ts` and replace the placeholders:

```typescript
export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // Replace with your Azure AD app client ID
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Replace with your tenant ID
    redirectUri: window.location.origin,
  },
  // ...
};
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

## Project Structure

```
tob-crm-web/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard/       # Dashboard component
│   │   ├── Leads/          # Leads management
│   │   ├── Accounts/       # Accounts management
│   │   └── Opportunities/  # Opportunities management
│   ├── config/             # Configuration files
│   │   └── authConfig.ts   # MSAL authentication config
│   ├── store/              # Redux store
│   │   ├── index.ts        # Store configuration
│   │   └── slices/         # Redux slices
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Dashboard
- Display key metrics and statistics
- Overview of leads, accounts, and opportunities
- Pipeline value tracking

### Leads
- View all leads in a table format
- Track lead status (new, contacted, qualified, lost)
- Monitor lead value

### Accounts
- Manage customer accounts
- Track company information
- View revenue and employee count

### Opportunities
- Monitor sales pipeline
- Track opportunity stages
- View probability and close dates
- Visual progress indicators

## State Management

The application uses Redux Toolkit with the following slices:
- `authSlice`: Authentication state
- `leadsSlice`: Leads data and operations
- `accountsSlice`: Accounts data and operations
- `opportunitiesSlice`: Opportunities data and operations

## Authentication Flow

1. User clicks "Sign In with Microsoft"
2. MSAL redirects to Microsoft login page
3. User authenticates with Microsoft credentials
4. MSAL returns authentication token
5. Application displays CRM interface

## License

This project is licensed under the MIT License - see the LICENSE file for details.
