// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { JwtPayload } from '@auth/types/jwt-payload.type';

// -------------------------------
// Third-Party Imports
// -------------------------------
import type { Request } from 'express';

export type AuthenticatedRequest = Request & {
  user?: JwtPayload;
};
