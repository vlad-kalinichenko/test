import { z } from 'zod';

const today = new Date();
const currentYear = today.getFullYear();

export const PERSONAL_INFO_SCHEMA = z.object({
  firstName: z
    .string()
    .regex(/^[A-Za-zäöüßÄÖÜ]+$/, 'Only Latin/German letters allowed, single name only')
    .refine((val) => !/\s/.test(val), { message: 'Only a single first name is allowed' }),
  lastName: z.string().regex(/^[A-Za-zäöüßÄÖÜ\s]+$/, 'Only Latin/German letters allowed'),
  dateOfBirth: z.date().refine(
    (dob) => {
      const age = currentYear - dob.getFullYear();
      return age <= 79;
    },
    { message: 'Age must be 79 or younger' },
  ),
});

export const DEFAULT_VALUES: z.infer<typeof PERSONAL_INFO_SCHEMA> = {
  firstName: '',
  lastName: '',
  dateOfBirth: new Date(),
};
