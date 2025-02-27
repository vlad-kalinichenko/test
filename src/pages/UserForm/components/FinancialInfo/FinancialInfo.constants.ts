import { z } from 'zod';

export const FINANCIAL_INFO_SCHEMA = z
  .object({
    monthlySalary: z.number({ invalid_type_error: 'Monthly salary is required' }),
    hasAdditionalIncome: z.boolean(),
    additionalIncome: z.number().optional(),
    hasMortgage: z.boolean(),
    mortgage: z.number().optional(),
    hasOtherCredits: z.boolean(),
    otherCredits: z.number().optional(),
  })
  .refine(
    (data) => {
      // Assume we get loanAmount and terms from previous steps (in a complete solution these would be merged into one data object)
      const loanAmount = 30000; // placeholder; in real code use context or form state
      const terms = 24; // placeholder
      const income = data.monthlySalary + (data.hasAdditionalIncome ? data.additionalIncome || 0 : 0);
      const deductions =
        (data.hasMortgage ? data.mortgage || 0 : 0) + (data.hasOtherCredits ? data.otherCredits || 0 : 0);
      return (income - deductions) * terms * 0.5 > loanAmount;
    },
    {
      path: ['monthlySalary'], // Associate the error with monthlySalary
      message: 'Financial validation failed. Please reduce the loan amount or restart with a new person.',
    },
  );

export const DEFAULT_VALUES: z.infer<typeof FINANCIAL_INFO_SCHEMA> = {
  monthlySalary: 0,
  hasAdditionalIncome: false,
  additionalIncome: 0,
  hasMortgage: false,
  mortgage: 0,
  hasOtherCredits: false,
  otherCredits: 0,
};
