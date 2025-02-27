import { z } from 'zod';

export const LOAN_REQUEST_SCHEMA = z
  .object({
    loanAmount: z.number().min(10000, 'Minimum loan amount is 10,000').max(70000, 'Maximum loan amount is 70,000'),
    upfrontPayment: z.number(),
    terms: z.number().min(10, 'Minimum terms is 10 months').max(30, 'Maximum terms is 30 months'),
  })
  .superRefine((data, ctx) => {
    if (data.upfrontPayment >= data.loanAmount) {
      ctx.addIssue({
        path: ['upfrontPayment'],
        code: z.ZodIssueCode.custom,
        message: 'Upfront payment must be lower than loan amount',
      });
    }
  });

export const DEFAULT_VALUES: z.infer<typeof LOAN_REQUEST_SCHEMA> = { loanAmount: 10000, upfrontPayment: 0, terms: 10 };
