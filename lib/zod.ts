import { z } from 'zod';

export const companySchema = z.object({
  id: z.string().optional(),
  name: z.string({
    required_error: 'Company name is required',
    invalid_type_error: 'Company name must be a string',
  }),
  imageUrl: z.string().nullable(),
});

export type CompanyForms = z.infer<typeof companySchema>;
