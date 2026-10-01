import { UserRole } from '@prisma/client';

export interface AuthenticatedUser {
  user_id: string;
  email: string;
  role: UserRole;
}
