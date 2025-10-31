import { Configuration, PopupRequest } from '@azure/msal-browser';

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: 'aa3ed19b-173e-4c54-9878-678dd57ace91', // Replace with your Azure AD app client ID
    authority: 'https://login.microsoftonline.com/82c3240a-fc69-499d-932c-65e6f2fae460', // Replace with your tenant ID
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

// Add scopes for ID token to be used at Microsoft identity platform endpoints
export const loginRequest: PopupRequest = {
  scopes: ['User.Read'],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
