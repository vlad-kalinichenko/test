export enum FormStep {
  PersonalInfo = 'Personal Information',
  ContactDetails = 'Contact Details',
  LoanRequest = 'Loan Request',
  FinancialInfo = 'Financial Information',
  Summary = 'Summary',
}

export const STEPS: FormStep[] = [
  FormStep.PersonalInfo,
  FormStep.ContactDetails,
  FormStep.LoanRequest,
  FormStep.FinancialInfo,
  FormStep.Summary,
];

export const STEP_KEYS = ['personalInfo', 'contactDetails', 'loanRequest', 'financialInfo'] as const;
