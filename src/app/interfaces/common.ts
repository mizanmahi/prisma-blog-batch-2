import { UserRole } from '@prisma/client';

export type VerifiedUser = {
   email: string;
   role: UserRole;
   iat: number;
   exp: number;
};
