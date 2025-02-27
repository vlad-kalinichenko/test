import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STEP_KEYS } from '../UserForm.constants';
import { CollectedData } from '../UserForm.types';

const useUserForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [collectedData, setCollectedData] = useState<CollectedData>({});

  const handleNext = (stepData: any) => {
    if (activeStep < STEP_KEYS.length) {
      const key = STEP_KEYS[activeStep];
      setCollectedData((prev) => ({ ...prev, [key]: stepData }));
    }
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    navigate(`/wizard/step-${nextStep + 1}`);
  };

  const handleBack = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
    navigate(`/wizard/step-${prevStep + 1}`);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCollectedData({});
    navigate('/wizard/step-1');
  };

  return {
    handleBack,
    handleNext,
    handleReset,
    activeStep,
    collectedData,
  };
};

export default useUserForm;
