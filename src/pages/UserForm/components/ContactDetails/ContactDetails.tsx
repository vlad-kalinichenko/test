import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { CONTACT_DETAILS_SCHEMA, DEFAULT_VALUES } from './ContactDetails.constants';
import { z } from 'zod';
import { Box, Button, TextField } from '@mui/material';
import { StepProps } from '../../UserForm.types';
import { useUserFormContext } from '../../UserForm.context';

export type ContactDetailsData = z.infer<typeof CONTACT_DETAILS_SCHEMA>;

export const ContactDetails: FC<StepProps> = ({ onNext, onBack }) => {
  const { collectedData } = useUserFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDetailsData>({
    resolver: zodResolver(CONTACT_DETAILS_SCHEMA),
    defaultValues: collectedData.contactDetails || DEFAULT_VALUES,
  });

  const submitHandler = (data: ContactDetailsData) => {
    console.log('Contact Details Submitted:', data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
        <TextField label="Phone" {...register('phone')} error={!!errors.phone} helperText={errors.phone?.message} />
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
