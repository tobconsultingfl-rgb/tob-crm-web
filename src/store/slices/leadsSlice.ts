import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  value: number;
  createdAt: string;
}

interface LeadsState {
  leads: Lead[];
  loading: boolean;
}

const initialState: LeadsState = {
  leads: [
    {
      id: '1',
      name: 'John Doe',
      company: 'Acme Corp',
      email: 'john@acme.com',
      phone: '555-0100',
      status: 'new',
      value: 50000,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Jane Smith',
      company: 'Tech Solutions',
      email: 'jane@techsolutions.com',
      phone: '555-0101',
      status: 'contacted',
      value: 75000,
      createdAt: new Date().toISOString(),
    },
  ],
  loading: false,
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex((lead) => lead.id === action.payload.id);
      if (index !== -1) {
        state.leads[index] = action.payload;
      }
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter((lead) => lead.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addLead, updateLead, deleteLead, setLoading } = leadsSlice.actions;
export default leadsSlice.reducer;
