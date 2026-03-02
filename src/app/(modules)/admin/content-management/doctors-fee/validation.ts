import { z } from 'zod';

export const AdminCreateDoctorFeeSchema = z.object({
  feature: z
    .string({ required_error: 'Feature is required.' })
    .trim()
    .min(2, { message: 'Feature is required.' }),
  value: z
    .string({ required_error: 'Value is required.' })
    .trim()
    .min(1, { message: 'Value is required.' })
});

export type TAdminCreateDoctorFeeSchema = z.infer<typeof AdminCreateDoctorFeeSchema>;
