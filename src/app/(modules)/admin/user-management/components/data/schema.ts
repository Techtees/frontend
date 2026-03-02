import { EnumRole, EnumUserStatus } from '@/constants/mangle';
import { z } from 'zod';

const userStatusSchema = z.union([
  z.literal(EnumUserStatus.ACTIVE),
  z.literal(EnumUserStatus.INACTIVE),
  z.literal(EnumUserStatus.INVITED),
  z.literal(EnumUserStatus.SUSPENDED),
  z.literal(EnumUserStatus.UNAVAILABLE)
]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const userRoleSchema = z.union([
  z.literal(EnumRole.SUPER_ADMIN),
  z.literal(EnumRole.RECEPTIONIST),
  z.literal(EnumRole.LAB_CORDINATOR),
  z.literal(EnumRole.DOCTOR),
  z.literal(EnumRole.REFERRAL_DOCTOR),
  z.literal(EnumRole.LAB_TECHNICIAN),
  z.literal(EnumRole.TECHNICAL_COORDINATOR),
  z.literal(EnumRole.MARKETER)
]);

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);
