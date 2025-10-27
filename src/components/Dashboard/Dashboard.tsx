import { Box, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Dashboard = () => {
  const leads = useSelector((state: RootState) => state.leads.leads);
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const opportunities = useSelector((state: RootState) => state.opportunities.opportunities);

  const totalRevenue = opportunities.reduce((sum, opp) => sum + opp.amount, 0);
  const totalLeadValue = leads.reduce((sum, lead) => sum + lead.value, 0);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color
  }: {
    title: string;
    value: string | number;
    icon: typeof TrendingUpIcon;
    color: string;
  }) => (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: 140,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Icon sx={{ color, fontSize: 40 }} />
      </Box>
      <Typography variant="h4" component="div" sx={{ mt: 2 }}>
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Leads"
            value={leads.length}
            icon={PeopleIcon}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Accounts"
            value={accounts.length}
            icon={BusinessIcon}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Opportunities"
            value={opportunities.length}
            icon={TrendingUpIcon}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pipeline Value"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={AttachMoneyIcon}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to TOB CRM! This dashboard provides a quick overview of your sales pipeline.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                • Lead Conversion Value: ${totalLeadValue.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                • Average Deal Size: ${opportunities.length > 0 ? Math.round(totalRevenue / opportunities.length).toLocaleString() : 0}
              </Typography>
              <Typography variant="body2">
                • Active Opportunities: {opportunities.filter(o => !o.stage.includes('closed')).length}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
