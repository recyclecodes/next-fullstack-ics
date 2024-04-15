import { z } from 'zod';

export const companySchema = z.object({
  // id: z.string(),
  name: z.string({
    required_error: 'Company name is required',
    invalid_type_error: 'Company name must be a string',
  }),
  imageUrl: z.string().nullable(),
});
// export const CreateCompany = companySchema.omit({ id: true });
export type CompanyForms = z.infer<typeof companySchema>;
