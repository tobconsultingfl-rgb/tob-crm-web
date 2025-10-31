import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './config/authConfig';
import { createApiServices } from './services';
import { UserDto } from './types';
import Dashboard from './components/Dashboard/Dashboard';
import Leads from './components/Leads/Leads';
import Accounts from './components/Accounts/Accounts';
import Opportunities from './components/Opportunities/Opportunities';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const { instance, accounts } = useMsal();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const isAuthenticated = accounts.length > 0;

  // Fetch current user data when authenticated
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!isAuthenticated) {
        setCurrentUser(null);
        return;
      }

      try {
        setLoadingUser(true);
        const apiServices = createApiServices(instance);
        const userData = await apiServices.users.getCurrentUser();
        setCurrentUser(userData);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, [isAuthenticated, instance]);

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup().catch((e) => {
      console.error(e);
    });
    setAnchorEl(null);
    setCurrentUser(null);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (currentUser?.firstName && currentUser?.lastName) {
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }
    return currentUser?.username || accounts[0]?.name || 'User';
  };

  const getUserInitials = () => {
    if (currentUser?.firstName && currentUser?.lastName) {
      return `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`;
    }
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TOB CRM
          </Typography>
          {isAuthenticated ? (
            <>
              {loadingUser ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                        {getUserDisplayName()}
                      </Typography>
                      {currentUser?.email && (
                        <Typography variant="caption" sx={{ opacity: 0.8, lineHeight: 1 }}>
                          {currentUser.email}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <IconButton onClick={handleMenuOpen} color="inherit">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                      {getUserInitials()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem disabled>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {getUserDisplayName()}
                        </Typography>
                        {currentUser?.email && (
                          <Typography variant="caption" color="text.secondary">
                            {currentUser.email}
                          </Typography>
                        )}
                        {currentUser?.tenantName && (
                          <Typography variant="caption" display="block" color="text.secondary">
                            {currentUser.tenantName}
                          </Typography>
                        )}
                        {currentUser?.roleName && (
                          <Typography variant="caption" display="block" color="primary">
                            {currentUser.roleName}
                          </Typography>
                        )}
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              )}
            </>
          ) : (
            <Button color="inherit" onClick={handleLogin} startIcon={<AccountCircleIcon />}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {isAuthenticated ? (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Container maxWidth="xl">
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="CRM tabs">
                <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" />
                <Tab icon={<PeopleIcon />} iconPosition="start" label="Leads" />
                <Tab icon={<BusinessIcon />} iconPosition="start" label="Accounts" />
                <Tab icon={<TrendingUpIcon />} iconPosition="start" label="Opportunities" />
              </Tabs>
            </Container>
          </Box>
          <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
            <TabPanel value={tabValue} index={0}>
              <Dashboard />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Leads />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Accounts />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <Opportunities />
            </TabPanel>
          </Container>
        </>
      ) : (
        <Container maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Welcome to TOB CRM
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Please sign in to access your CRM dashboard
            </Typography>
            <Button variant="contained" size="large" onClick={handleLogin} startIcon={<AccountCircleIcon />}>
              Sign In with Microsoft
            </Button>
          </Box>
        </Container>
      )}
    </Box>
  );
}

export default App;
