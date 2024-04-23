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

export const itemSchema = z.object({
  id: z.string().optional(),
  name: z.string({
    required_error: 'Item name is required',
    invalid_type_error: 'Item name must be a string',
  }),
  description: z.string().optional(),
  price: z
    .string()
    .transform((val) => val.trim()) // Optional: trim whitespace from string inputs
    .refine((val) => /^\d+(\.\d+)?$/.test(val), {
      message: 'Price must be a valid number',
    })
    .transform((val) => parseFloat(val))
    .optional(), // Convert the string to a number
  quantity: z
    .string()
    .transform((val) => val.trim()) // Optional: trim whitespace from string inputs
    .refine((val) => /^\d+(\.\d+)?$/.test(val), {
      message: 'Price must be a valid number',
    })
    .transform((val) => parseFloat(val))
    .optional(),
  imageUrl: z.string({
    required_error: 'Item image is required',
  }),
});

export type ItemForms = z.infer<typeof itemSchema>;
