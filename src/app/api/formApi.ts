// src/api/formApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// These types should match the data collected in your wizard.
export interface PersonalInfoData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface ContactDetailsData {
  email: string;
  phone: string;
}

export interface LoanRequestData {
  loanAmount: number;
  upfrontPayment: number;
  terms: number;
}

export interface FinancialInfoData {
  monthlySalary: number;
  hasAdditionalIncome: boolean;
  additionalIncome?: number;
  hasMortgage: boolean;
  mortgage?: number;
  hasOtherCredits: boolean;
  otherCredits?: number;
}

export interface FormData {
  personalInfo: PersonalInfoData;
  contactDetails: ContactDetailsData;
  loanRequest: LoanRequestData;
  financialInfo: FinancialInfoData;
}

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    submitFormData: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: '/entities',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useSubmitFormDataMutation } = formApi;
