import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Opportunity {
  id: string;
  name: string;
  account: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  amount: number;
  probability: number;
  closeDate: string;
  createdAt: string;
}

interface OpportunitiesState {
  opportunities: Opportunity[];
  loading: boolean;
}

const initialState: OpportunitiesState = {
  opportunities: [
    {
      id: '1',
      name: 'Enterprise Software Deal',
      account: 'Acme Corporation',
      stage: 'proposal',
      amount: 150000,
      probability: 75,
      closeDate: '2025-12-31',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Cloud Migration Project',
      account: 'Tech Solutions Inc',
      stage: 'negotiation',
      amount: 250000,
      probability: 85,
      closeDate: '2025-11-30',
      createdAt: new Date().toISOString(),
    },
  ],
  loading: false,
};

const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    addOpportunity: (state, action: PayloadAction<Opportunity>) => {
      state.opportunities.push(action.payload);
    },
    updateOpportunity: (state, action: PayloadAction<Opportunity>) => {
      const index = state.opportunities.findIndex((opp) => opp.id === action.payload.id);
      if (index !== -1) {
        state.opportunities[index] = action.payload;
      }
    },
    deleteOpportunity: (state, action: PayloadAction<string>) => {
      state.opportunities = state.opportunities.filter((opp) => opp.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addOpportunity, updateOpportunity, deleteOpportunity, setLoading } = opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;
