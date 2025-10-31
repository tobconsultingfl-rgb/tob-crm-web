import { ProblemDetails } from './ProblemDetails';

export interface ValidationProblemDetails extends ProblemDetails {
  errors?: Record<string, string[]> | null;
}
