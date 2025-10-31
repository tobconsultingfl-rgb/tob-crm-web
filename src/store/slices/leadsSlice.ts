import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LeadDto, CreateLeadCommand, UpdateLeadCommand, GetLeadsQueryParams } from '../../types/leads.types';
import { LeadsService } from '../../services/leadsService';

interface LeadsState {
  leads: LeadDto[];
  currentLead: LeadDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: LeadsState = {
  leads: [],
  currentLead: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchLeads = createAsyncThunk(
  'leads/fetchLeads',
  async ({ leadsService, params }: { leadsService: LeadsService; params?: GetLeadsQueryParams }) => {
    const leads = await leadsService.getLeads(params);
    return leads;
  }
);

export const fetchLeadById = createAsyncThunk(
  'leads/fetchLeadById',
  async ({ leadsService, id, tenantId }: { leadsService: LeadsService; id: string; tenantId?: string }) => {
    const lead = await leadsService.getLeadById(id, tenantId);
    return lead;
  }
);

export const createLead = createAsyncThunk(
  'leads/createLead',
  async ({ leadsService, command }: { leadsService: LeadsService; command: CreateLeadCommand }) => {
    const lead = await leadsService.createLead(command);
    return lead;
  }
);

export const updateLead = createAsyncThunk(
  'leads/updateLead',
  async ({ leadsService, id, command }: { leadsService: LeadsService; id: string; command: UpdateLeadCommand }) => {
    const lead = await leadsService.updateLead(id, command);
    return lead;
  }
);

export const deleteLead = createAsyncThunk(
  'leads/deleteLead',
  async ({ leadsService, id, tenantId }: { leadsService: LeadsService; id: string; tenantId?: string }) => {
    await leadsService.deleteLead(id, tenantId);
    return id;
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentLead: (state) => {
      state.currentLead = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch leads
    builder.addCase(fetchLeads.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.loading = false;
      state.leads = action.payload;
    });
    builder.addCase(fetchLeads.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch leads';
    });

    // Fetch lead by ID
    builder.addCase(fetchLeadById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLeadById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentLead = action.payload;
    });
    builder.addCase(fetchLeadById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch lead';
    });

    // Create lead
    builder.addCase(createLead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createLead.fulfilled, (state, action) => {
      state.loading = false;
      state.leads.push(action.payload);
    });
    builder.addCase(createLead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create lead';
    });

    // Update lead
    builder.addCase(updateLead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.leads.findIndex((lead) => lead.id === action.payload.id);
      if (index !== -1) {
        state.leads[index] = action.payload;
      }
      if (state.currentLead?.id === action.payload.id) {
        state.currentLead = action.payload;
      }
    });
    builder.addCase(updateLead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update lead';
    });

    // Delete lead
    builder.addCase(deleteLead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteLead.fulfilled, (state, action) => {
      state.loading = false;
      state.leads = state.leads.filter((lead) => lead.id !== action.payload);
      if (state.currentLead?.id === action.payload) {
        state.currentLead = null;
      }
    });
    builder.addCase(deleteLead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete lead';
    });
  },
});

export const { clearError, clearCurrentLead } = leadsSlice.actions;
export default leadsSlice.reducer;
