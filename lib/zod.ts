import { z } from 'zod';

export const companySchema = z.object({
  id: z.string().optional(),
  name: z.string({
    required_error: 'Company name is required',
    invalid_type_error: 'Company name must be a string',
  }),
  imageUrl: z.string({
    required_error: 'Company logo image is required',
  }),
});

export type CompanyForms = z.infer<typeof companySchema>;

export const userSchema = z.object({
  id: z.string().optional(),
  companyId: z.string({
    required_error: 'Please select a company.',
  }),
  email: z.string({ required_error: 'Email is required' }).email(),
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(5, { message: 'Name must contain atleast 5 characters' }),
  imageUrl: z.string({
    required_error: 'User image is required',
  }),
});

export type UserForms = z.infer<typeof userSchema>;
