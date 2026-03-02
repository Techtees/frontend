import { upperCaseRegex, lowerCaseRegex, numberRegex, specialCharcterRegex } from '@/utils';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { parsePhoneNumber } from 'libphonenumber-js/min';
import { z } from 'zod';

export const email = z
  .string({ required_error: 'Email is required.' })
  .email('Invalid email address.');
export const password = z
  .string({ required_error: 'Password is required.' })
  .min(8, {
    message: 'Must contain at least an uppercase, lowercase, special character and a number.'
  })
  .refine((value) => upperCaseRegex.test(value), 'Password must contain atleast an uppercase.')
  .refine((value) => numberRegex.test(value), 'Password must contain atleast a number.')
  .refine(
    (value) => specialCharcterRegex.test(value),
    'Password must contain at least a special character.'
  )
  .refine((value) => lowerCaseRegex.test(value), 'Password must contain atleast a lowercase.');
export const confirmPassword = z
  .string({ required_error: 'Confirm Password is required.' })
  .trim()
  .min(1, { message: 'Confirm password is required.' });

export const firstName = z
  .string()
  .trim()
  .min(2, { message: 'First Name is required.' })
  .refine((value) => numberRegex.test(value) === false, 'Numbers not allowed.');

export const lastName = z
  .string()
  .trim()
  .min(2, { message: 'Last Name is required.' })
  .refine((value) => numberRegex.test(value) === false, 'Numbers not allowed.');

export const phoneNumber = z
  .string({ required_error: 'Phone number is required.' })
  .trim()
  .refine(isValidPhoneNumber, { message: 'Invalid phone number' });

export const AuthLoginResponseSchema = z.object({
  access_token: z.string(),
  email_verified: z.boolean()
});
export const address = z
  .string({ required_error: 'Address is required.' })
  .trim()
  .refine((value) => value !== '', 'Address is required.');

export const city = z
  .string({ required_error: 'City is required.' })
  .trim()
  .refine((value) => value !== '', 'City is required.');

export const state = z
  .string({ required_error: 'State is required.' })
  .trim()
  .refine((value) => value !== '', 'State is required.');

export const landMark = z.string({ required_error: 'Address is required.' }).trim().optional();

export const zipCode = z
  .string({ required_error: 'Zip code is required.' })
  .trim()
  .refine((value) => value !== '', 'zip code is required.');

export const maritalStatus = z.string().trim().optional();
export const gender = z.string({ required_error: 'Gender is required.' }).trim();
export const dateOfBirth = z.date({ required_error: 'Date of birth is required.' });

export const EmailLoginValidationSchema = z.object({
  email,
  password
});

export const PhoneNumberLoginValidationSchema = z.object({
  phoneNumber,
  password
});

export const LoginValidationSchema = EmailLoginValidationSchema.or(
  PhoneNumberLoginValidationSchema
);

export const CreateAccountValidationSchema = z
  .object({
    firstName,
    lastName,
    email: z.string().optional(),
    phoneNumber: phoneNumber.optional().refine((value) => value === undefined || value.length > 0, {
      message: 'Phone number cannot be empty if provided.'
    }),
    role: z.string({ required_error: 'Select a role' }).trim().min(1, { message: 'Select role.' }),
    password,
    confirmPassword
  })
  .superRefine((data, ctx) => {
    const { password, confirmPassword, phoneNumber } = data;

    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match.',
        path: ['confirmPassword']
      });
    }

    if (data.email) {
      try {
        email.parse(data.email);
      } catch (error) {
        if (error instanceof z.ZodError) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Provide valid email.',
            path: ['email']
          });
        }
      }
    }

    if (!phoneNumber && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Provide email/phone number.',
        path: ['email', 'phoneNumber']
      });
    }
  });

export const CreatePatientAcctValidationSchema = z
  .object({
    email,
    password,
    confirmPassword
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

export const PwdSchema = z
  .object({
    password,
    new_password: password,
    confirmPassword
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

export const NewPwdSchema = z
  .object({
    newPassword: password,
    confirmPassword
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

export const ForgotPwdSchema = z.object({
  email
});

export const PatientPersonalSchema = z
  .object({
    firstName,
    lastName,
    email: z.string().optional(),
    phoneNumber,
    maritalStatus,
    gender,
    dateOfBirth,
    weight: z.string().trim().optional(),
    height: z.string().trim().optional(),
    primaryCarePhysician: z.string().trim().optional()
  })
  .superRefine((data, ctx) => {
    const { phoneNumber } = data;

    if (!phoneNumber && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Provide email/phone number.',
        path: ['email', 'phoneNumber']
      });
    }

    if (data.email) {
      try {
        email.parse(data.email);
      } catch (error) {
        if (error instanceof z.ZodError) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Provide valid email.',
            path: ['email']
          });
        }
      }
    }
  });

export const PatientContactSchema = z.object({
  homeAddress: address,
  city,
  state,
  landMark: landMark,
  zipCode: z.string({ required_error: 'Zip code is required.' }).trim().optional(),
  emergencyContact: z
    .object({
      firstName: z.string().trim().optional(),
      lastName: z.string().trim().optional(),
      address: z.string().trim().optional(),
      phoneNumber: z.string().trim().optional()
    })
    .optional()
    .superRefine((data, ctx) => {
      const phoneNumber = data?.phoneNumber;
      if (phoneNumber) {
        const { number } = parsePhoneNumber(phoneNumber);
        if (number.length != 14) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid phone number'
          });
        }
      }
    })
});

export const PatientInsuranceSchema = z
  .object({
    primaryInsuranceProvider: z
      .string({ required_error: 'Primary insurance is required.' })
      .trim()
      .optional(),
    insurancePlanName: z
      .string({ required_error: 'Insurance plan name is required.' })
      .trim()
      .optional(),
    policyNumber: z.string({ required_error: 'Phone number is required.' }).trim().optional(),
    groupNumber: z.string({ required_error: 'Phone number is required.' }).trim().optional(),
    insurancePhoneNumber: z
      .string({ required_error: 'Phone number is required.' })
      .trim()
      .optional(),
    policyHolder: z
      .object({
        firstName: z.string({ required_error: 'First name is required.' }).trim().optional(),
        lastName: z.string({ required_error: 'Last name is required.' }).trim().optional(),
        phoneNumber: z.string({ required_error: 'Phone number is required.' }).trim().optional()
      })
      .optional()
  })
  .superRefine((data, ctx) => {
    const { primaryInsuranceProvider } = data;

    if (primaryInsuranceProvider) {
      // Check insurance plan name
      if (!data.insurancePlanName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Insurance plan name is required when primary insurance is provided',
          path: ['insurancePlanName']
        });
      }

      // Check policy holder information
      if (!data.policyHolder?.firstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Policy holder first name is required when primary insurance is provided',
          path: ['policyHolder', 'firstName']
        });
      }

      if (!data.policyHolder?.lastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Policy holder last name is required when primary insurance is provided',
          path: ['policyHolder', 'lastName']
        });
      }

      if (!data.policyHolder?.phoneNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Policy holder phone number is required when primary insurance is provided',
          path: ['policyHolder', 'phoneNumber']
        });
      } else {
        if (upperCaseRegex.test(data.policyHolder.phoneNumber)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone Number can not contain uppercase letters.',
            path: ['policyHolder', 'phoneNumber']
          });
        }

        if (lowerCaseRegex.test(data.policyHolder.phoneNumber)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone Number can not contain lowercase letters.',
            path: ['policyHolder', 'phoneNumber']
          });
        }
        if (specialCharcterRegex.test(data.policyHolder.phoneNumber)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone Number can not contain special letters.',
            path: ['policyHolder', 'phoneNumber']
          });
        }

        if (data.policyHolder.phoneNumber.length > 15) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone number can not be more than 15 digits.',
            path: ['policyHolder', 'phoneNumber']
          });
        }
      }
    }
  });

export const PatientRegFormSchema =
  PatientPersonalSchema.and(PatientContactSchema).and(PatientInsuranceSchema);

export type TAuthLoginResponse = INBTServerResp<z.infer<typeof AuthLoginResponseSchema>>;
export type TEmailLogin = z.infer<typeof EmailLoginValidationSchema>;
export type TPhoneNumberLogin = z.infer<typeof PhoneNumberLoginValidationSchema>;
export type TLogin = z.infer<typeof LoginValidationSchema>;
export type TCreateAccount = z.infer<typeof CreateAccountValidationSchema>;
export type TCreatePatientAcct = z.infer<typeof CreatePatientAcctValidationSchema>;
export type TPwdSchema = z.infer<typeof PwdSchema>;
export type TNewPwdSchema = z.infer<typeof NewPwdSchema>;
export type TForgotPwd = z.infer<typeof ForgotPwdSchema>;
export type TPatientPersonalSchema = z.infer<typeof PatientPersonalSchema>;
export type TPatientContactSchema = z.infer<typeof PatientContactSchema>;
export type TPatientInsuranceSchema = z.infer<typeof PatientInsuranceSchema>;
export type TPatientRegForm = z.infer<typeof PatientRegFormSchema>;
