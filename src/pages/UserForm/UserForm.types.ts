import { ReactNode } from 'react';
import { ContactDetailsData, FinancialInfoData, LoanRequestData, PersonalInfoData } from './components';

export type Step = {
  key: string;
  title: string;
  component: ReactNode;
};

export type StepProps = {
  onNext: (data: any) => void;
  onBack?: () => void;
};

export type CollectedData = {
  personalInfo?: PersonalInfoData;
  contactDetails?: ContactDetailsData;
  loanRequest?: LoanRequestData;
  financialInfo?: FinancialInfoData;
};

export type SummaryProps = StepProps & { allData: Required<CollectedData> };

export type UserFormContextProps = {
  collectedData: CollectedData;
};
