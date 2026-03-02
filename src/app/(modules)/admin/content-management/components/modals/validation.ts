import { z } from 'zod';

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional()
});

export const AdminSingleTestSchema = z
  .object({
    name: z
      .string({ required_error: 'Test name is required.' })
      .trim()
      .min(2, { message: 'Test name is required.' }),
    description: z
      .string({ required_error: 'Test description is required.' })
      .trim()
      .min(2, { message: 'Test description is required.' }),
    requirements: z.string().trim().optional(),
    category: z
      .string({ required_error: 'Test category is required.' })
      .trim()
      .min(2, { message: 'Test category is required.' }),
    price: z.number({ required_error: 'Enter an amount.' }),
    discountedPrice: z.number({ required_error: 'Enter an amount.' }).optional()
  })
  .superRefine((data, ctx) => {
    const { price, discountedPrice } = data;

    if (discountedPrice) {
      if (discountedPrice > price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "discounted price can't be more than actual price",
          path: ['discountedPrice']
        });
      }
    }
  });

export const AdminPackageTestSchema = z
  .object({
    name: z
      .string({ required_error: 'Test name is required.' })
      .trim()
      .min(2, { message: 'Test name is required.' }),
    description: z
      .string({ required_error: 'Test description is required.' })
      .trim()
      .min(2, { message: 'Test description is required.' }),
    requirements: z.string().trim().optional(),
    testIds: z.array(optionSchema, { required_error: 'Tests is required' }),
    price: z.number({ required_error: 'Enter an amount.' }).optional(),
    discountedPrice: z.number({ required_error: 'Enter an amount.' }).optional()
  })
  .superRefine((data, ctx) => {
    const { price, discountedPrice } = data;

    if (discountedPrice && price) {
      if (discountedPrice > price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "discounted price can't be more than actual price",
          path: ['discountedPrice']
        });
      }
    }
  });

export const AdminTestTemplateParameterSchema = z.object({
  name: z
    .string({ required_error: 'Parameter name is required.' })
    .trim()
    .min(2, { message: 'Parameter name is required.' }),
  measurement_unit: z
    .string({ required_error: 'Measurement unit is required.' })
    .trim()
    .min(1, { message: 'Measurement unit is required.' }),
  reference_range: z
    .string({ required_error: 'Reference range is required.' })
    .trim()
    .min(1, { message: 'Reference range is required.' })
});

export const AdminTestTemplateSchema = z.object({
  testId: z
    .string({ required_error: 'Test is required.' })
    .trim()
    .min(1, { message: 'Test is required.' }),
  parameters: z.array(AdminTestTemplateParameterSchema).min(1, {
    message: 'At least one parameter is required.'
  })
});

export type TAdminSingleTestSchema = z.infer<typeof AdminSingleTestSchema>;

export type TAdminPackageTestSchema = z.infer<typeof AdminPackageTestSchema>;

export type TAdminTestTemplateSchema = z.infer<typeof AdminTestTemplateSchema>;
