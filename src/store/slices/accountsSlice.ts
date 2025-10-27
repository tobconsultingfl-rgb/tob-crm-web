import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Account {
  id: string;
  name: string;
  industry: string;
  website: string;
  phone: string;
  revenue: number;
  employees: number;
  createdAt: string;
}

interface AccountsState {
  accounts: Account[];
  loading: boolean;
}

const initialState: AccountsState = {
  accounts: [
    {
      id: '1',
      name: 'Acme Corporation',
      industry: 'Technology',
      website: 'www.acme.com',
      phone: '555-1000',
      revenue: 5000000,
      employees: 250,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      industry: 'Software',
      website: 'www.techsolutions.com',
      phone: '555-2000',
      revenue: 3000000,
      employees: 150,
      createdAt: new Date().toISOString(),
    },
  ],
  loading: false,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      const index = state.accounts.findIndex((account) => account.id === action.payload.id);
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    deleteAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter((account) => account.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addAccount, updateAccount, deleteAccount, setLoading } = accountsSlice.actions;
export default accountsSlice.reducer;
