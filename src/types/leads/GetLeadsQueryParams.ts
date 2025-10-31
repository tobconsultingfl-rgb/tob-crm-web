export interface GetLeadsQueryParams {
  tenantId?: string;
  name?: string;
  status?: string;
  pageNumber?: number;
  pageSize?: number;
  includeDeleted?: boolean;
}
