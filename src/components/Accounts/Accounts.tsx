import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Accounts = () => {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Accounts
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell align="right">Employees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id} hover>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.industry}</TableCell>
                <TableCell>{account.website}</TableCell>
                <TableCell>{account.phone}</TableCell>
                <TableCell align="right">${account.revenue.toLocaleString()}</TableCell>
                <TableCell align="right">{account.employees}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Accounts;
