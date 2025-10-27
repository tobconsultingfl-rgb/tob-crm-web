import { useState } from 'react';
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
} from '@mui/material';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './config/authConfig';
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

  const isAuthenticated = accounts.length > 0;
  const userName = accounts[0]?.name || 'User';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TOB CRM
          </Typography>
          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {userName.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>
                  <Typography variant="body2">{userName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
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
