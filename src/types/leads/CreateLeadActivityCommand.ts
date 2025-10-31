import { LeadActivityDto } from './LeadActivityDto';

export interface CreateLeadActivityCommand {
  activity: LeadActivityDto;
  updateLeadSummary?: boolean;
}
