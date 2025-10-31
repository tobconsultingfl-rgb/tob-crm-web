import { useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, CircularProgress, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { RootState } from '../../store';
import { fetchLeads } from '../../store/slices/leadsSlice';
import { createApiServices } from '../../services';

const Leads = () => {
  const dispatch = useDispatch();
  const { instance } = useMsal();
  const { leads, loading, error } = useSelector((state: RootState) => state.leads);

  useEffect(() => {
    const loadLeads = async () => {
      const apiServices = createApiServices(instance);
      // Fetch leads - you can add tenantId filter here if needed
      dispatch(fetchLeads({ leadsService: apiServices.leads }) as any);
    };

    loadLeads();
  }, [dispatch, instance]);

  const getStatusColor = (status?: string | null) => {
    if (!status) return 'default';
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'new':
        return 'primary';
      case 'contacted':
        return 'info';
      case 'qualified':
        return 'success';
      case 'lost':
      case 'disqualified':
        return 'error';
      case 'converted':
        return 'success';
      default:
        return 'default';
    }
  };

  if (loading && leads.length === 0) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Leads
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {leads.length === 0 && !loading ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No leads found. Leads will appear here once they are created.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Lead Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Estimated Value</TableCell>
                <TableCell align="right">Lead Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} hover>
                  <TableCell>{lead.leadNumber || '-'}</TableCell>
                  <TableCell>{lead.fullName || `${lead.firstName || ''} ${lead.lastName || ''}`.trim() || '-'}</TableCell>
                  <TableCell>{lead.companyName || '-'}</TableCell>
                  <TableCell>{lead.email || '-'}</TableCell>
                  <TableCell>{lead.phone || lead.mobilePhone || '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={lead.status?.toUpperCase() || 'UNKNOWN'}
                      color={getStatusColor(lead.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell align="right">{lead.leadScore || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Leads;
