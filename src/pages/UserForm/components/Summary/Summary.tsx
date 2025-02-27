import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SummaryProps } from '../../UserForm.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSnackbar } from 'notistack';
import { DEFAULT_VALUES, SUMMARY_SCHEMA } from './Summary.constants';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useSubmitFormDataMutation } from '@/app/api/formApi';

export type SummaryData = z.infer<typeof SUMMARY_SCHEMA>;

export const Summary: FC<SummaryProps> = ({ onBack, onNext, allData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [submitFormData, { isLoading }] = useSubmitFormDataMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SummaryData>({
    resolver: zodResolver(SUMMARY_SCHEMA),
    defaultValues: DEFAULT_VALUES,
  });

  const submitHandler = async (data: SummaryData) => {
    try {
      await submitFormData(allData).unwrap();
      enqueueSnackbar('Application submitted successfully!', { variant: 'success' });
      onNext(data);
    } catch (err) {
      enqueueSnackbar('Submission failed. Please try again.', { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ mb: 2 }}>
        <pre>{JSON.stringify(allData, null, 2)}</pre>
      </Box>
      <FormControlLabel
        control={<Checkbox {...register('confirm')} />}
        label="I confirm that the above data is correct"
      />
      {errors.confirm && <Box color="error.main">{errors.confirm.message}</Box>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        {onBack && (
          <Button onClick={onBack} variant="outlined">
            Back
          </Button>
        )}
        <Button disabled={isLoading} type="submit" variant="contained">
          {isLoading ? 'Submitting...' : 'Finalize'}
        </Button>
      </Box>
    </form>
  );
};

export default Summary;
