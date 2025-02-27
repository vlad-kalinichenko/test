import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DEFAULT_VALUES, PERSONAL_INFO_SCHEMA } from './PersonalInfo.constants';
import { Box, Button, TextField } from '@mui/material';
import { StepProps } from '../../UserForm.types';
import { useUserFormContext } from '../../UserForm.context';

export type PersonalInfoData = z.infer<typeof PERSONAL_INFO_SCHEMA>;

export const PersonalInfo: FC<StepProps> = ({ onNext }) => {
  const { collectedData } = useUserFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(PERSONAL_INFO_SCHEMA),
    defaultValues: collectedData.personalInfo || DEFAULT_VALUES,
  });

  const submitHandler = (data: PersonalInfoData) => {
    // API call placeholder for step 1
    console.log('Personal Info Submitted:', data);
    // e.g., await fetch('/api/personal-info', { method: 'POST', body: JSON.stringify(data) });
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="First Name"
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="Last Name"
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField
          label="Date of Birth"
          type="date"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          {...register('dateOfBirth', { valueAsDate: true })}
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth?.message}
        />
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </form>
  );
};
