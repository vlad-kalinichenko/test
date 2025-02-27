import { z } from 'zod';

export const CONTACT_DETAILS_SCHEMA = z.object({
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Invalid E.164 phone format (e.g., +1234567890)'),
});

export const DEFAULT_VALUES: z.infer<typeof CONTACT_DETAILS_SCHEMA> = { email: '', phone: '' };
