export interface LeadActivityDto {
  id: string;
  leadId: string;
  activityType?: string | null;
  subject?: string | null;
  notes?: string | null;
  activityDate: string;
  duration?: number | null;
  createdBy?: string | null;
  createdByName?: string | null;
  createdDate: string;
}
