import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const profileSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
});
