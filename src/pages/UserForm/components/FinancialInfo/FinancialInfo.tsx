import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DEFAULT_VALUES, FINANCIAL_INFO_SCHEMA } from './FinancialInfo.constants';
import { StepProps } from '../../UserForm.types';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useUserFormContext } from '../../UserForm.context';

export type FinancialInfoData = z.infer<typeof FINANCIAL_INFO_SCHEMA>;

export const FinancialInfo: FC<StepProps> = ({ onNext, onBack }) => {
  const { collectedData } = useUserFormContext();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FinancialInfoData>({
    resolver: zodResolver(FINANCIAL_INFO_SCHEMA),
    defaultValues: collectedData.financialInfo || DEFAULT_VALUES,
  });

  useEffect(() => {
    reset(collectedData.financialInfo || DEFAULT_VALUES);
  }, [collectedData.financialInfo, reset]);

  const hasAdditionalIncome = watch('hasAdditionalIncome');
  const hasMortgage = watch('hasMortgage');
  const hasOtherCredits = watch('hasOtherCredits');

  const submitHandler = (data: FinancialInfoData) => {
    console.log('Financial Info Submitted:', data);

    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Monthly Salary"
          type="number"
          {...register('monthlySalary', { valueAsNumber: true })}
          error={!!errors.monthlySalary}
          helperText={errors.monthlySalary?.message}
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register('hasAdditionalIncome')}
              defaultChecked={collectedData.financialInfo?.hasAdditionalIncome ?? DEFAULT_VALUES.hasAdditionalIncome}
            />
          }
          label="I have additional income"
        />
        {hasAdditionalIncome && (
          <TextField
            label="Additional Income"
            type="number"
            {...register('additionalIncome', { valueAsNumber: true })}
            error={!!errors.additionalIncome}
            helperText={errors.additionalIncome?.message}
          />
        )}
        <FormControlLabel
          control={
            <Checkbox
              {...register('hasMortgage')}
              defaultChecked={collectedData.financialInfo?.hasMortgage ?? DEFAULT_VALUES.hasMortgage}
            />
          }
          label="I have a mortgage"
        />
        {hasMortgage && (
          <TextField
            label="Mortgage"
            type="number"
            {...register('mortgage', { valueAsNumber: true })}
            error={!!errors.mortgage}
            helperText={errors.mortgage?.message}
          />
        )}
        <FormControlLabel
          control={
            <Checkbox
              {...register('hasOtherCredits')}
              defaultChecked={collectedData.financialInfo?.hasOtherCredits ?? DEFAULT_VALUES.hasOtherCredits}
            />
          }
          label="I have other credits"
        />
        {hasOtherCredits && (
          <TextField
            label="Other Credits"
            type="number"
            {...register('otherCredits', { valueAsNumber: true })}
            error={!!errors.otherCredits}
            helperText={errors.otherCredits?.message}
          />
        )}
        {errors && errors.root && <Box color="error.main">{errors.root.message}</Box>}
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
