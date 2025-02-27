import { FC, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { ContactDetails, FinancialInfo, LoanRequest, PersonalInfo, Summary } from './components';
import { STEPS } from './UserForm.constants';
import useUserForm from './hooks/useUserForm';
import { CollectedData } from './UserForm.types';
import { Card, Grid2 } from '@mui/material';
import { UserFormContext } from './UserForm.context';

const UserForm: FC = () => {
  const { activeStep, collectedData, handleNext, handleBack, handleReset } = useUserForm();

  const renderStepContent = useCallback(
    (step: number) => {
      const components = [
        <PersonalInfo onNext={handleNext} />,
        <ContactDetails onNext={handleNext} onBack={handleBack} />,
        <LoanRequest onNext={handleNext} onBack={handleBack} />,
        <FinancialInfo onNext={handleNext} onBack={handleBack} />,
        <Summary allData={collectedData as Required<CollectedData>} onNext={handleNext} onBack={handleBack} />,
      ];

      if (components[step]) {
        return components[step];
      }

      handleReset();
    },
    [activeStep, collectedData],
  );

  return (
    <Grid2 container justifyContent="center" p="40px">
      <Grid2 size={{ xs: 12, lg: 10, xl: 6 }}>
        <UserFormContext.Provider value={{ collectedData }}>
          <Card sx={{ p: 2 }}>
            <Stepper activeStep={activeStep}>
              {STEPS.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>
          </Card>
        </UserFormContext.Provider>
      </Grid2>
    </Grid2>
  );
};

export default UserForm;
