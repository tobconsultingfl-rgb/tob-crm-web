import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Opportunities = () => {
  const opportunities = useSelector((state: RootState) => state.opportunities.opportunities);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'default';
      case 'qualification':
        return 'info';
      case 'proposal':
        return 'primary';
      case 'negotiation':
        return 'warning';
      case 'closed-won':
        return 'success';
      case 'closed-lost':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Opportunities
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Probability</TableCell>
              <TableCell>Close Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {opportunities.map((opportunity) => (
              <TableRow key={opportunity.id} hover>
                <TableCell>{opportunity.name}</TableCell>
                <TableCell>{opportunity.account}</TableCell>
                <TableCell>
                  <Chip
                    label={opportunity.stage.replace('-', ' ').toUpperCase()}
                    color={getStageColor(opportunity.stage)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">${opportunity.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={opportunity.probability}
                      sx={{ width: 100 }}
                    />
                    <Typography variant="body2">{opportunity.probability}%</Typography>
                  </Box>
                </TableCell>
                <TableCell>{new Date(opportunity.closeDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Opportunities;
