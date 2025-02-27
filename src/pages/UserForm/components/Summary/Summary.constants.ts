import { z } from 'zod';

export const SUMMARY_SCHEMA = z.object({
  confirm: z.boolean().refine((val) => val === true, {
    message: 'You must confirm to finalize the application',
  }),
});

export const DEFAULT_VALUES: z.infer<typeof SUMMARY_SCHEMA> = { confirm: false };
