import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DEFAULT_VALUES, LOAN_REQUEST_SCHEMA } from './LoanRequest.constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { StepProps } from '../../UserForm.types';
import { Box, Button, TextField } from '@mui/material';
import { useUserFormContext } from '../../UserForm.context';

export type LoanRequestData = z.infer<typeof LOAN_REQUEST_SCHEMA>;

export const LoanRequest: FC<StepProps> = ({ onBack, onNext }) => {
  const { collectedData } = useUserFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanRequestData>({
    resolver: zodResolver(LOAN_REQUEST_SCHEMA),
    defaultValues: collectedData.loanRequest || DEFAULT_VALUES,
  });

  const submitHandler = (data: LoanRequestData) => {
    console.log('Loan Request Submitted:', data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Loan Amount"
          type="number"
          {...register('loanAmount', { valueAsNumber: true })}
          error={!!errors.loanAmount}
          helperText={errors.loanAmount?.message}
        />
        <TextField
          label="Upfront Payment"
          type="number"
          {...register('upfrontPayment', { valueAsNumber: true })}
          error={!!errors.upfrontPayment}
          helperText={errors.upfrontPayment?.message}
        />
        <TextField
          label="Terms (months)"
          type="number"
          {...register('terms', { valueAsNumber: true })}
          error={!!errors.terms}
          helperText={errors.terms?.message}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {onBack && (
            <Button onClick={onBack} variant="outlined">
              Back
            </Button>
          )}
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    </form>
  );
};
