'use client';
import { EnumPatientForm } from '@/constants/mangle';
import InsuranceForm from './components/Insurance';
import ContactForm from './components/Contact';
import PersonalForm from './components/Personal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PatientInsuranceSchema, TPatientInsuranceSchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Button from '@/atoms/Buttons';
import { CardContent } from '@/components/ui/card';

const PatientRegView = () => {
  const router = useRouter();
  const {
    PatientStore: { isLoading, setCurrentForm, currentForm, updatePatient, setInsuranceInfo }
  } = useStore();
  const form = useForm<TPatientInsuranceSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(PatientInsuranceSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TPatientInsuranceSchema> = async (formData) => {
    setInsuranceInfo(formData, () => updatePatient((url) => router.replace(url)));
  };

  const switchDetails = (key: EnumPatientForm) => {
    switch (key) {
      case EnumPatientForm.PEROSNAL:
        return <PersonalForm />;
      case EnumPatientForm.CONTACT:
        return <ContactForm />;
      case EnumPatientForm.INSURANCE:
        return (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InsuranceForm />
              <div className="flex items-center justify-between space-x-2">
                <Button
                  type="button"
                  variant="transparent"
                  text="Prev"
                  disabled={isLoading.regPatient}
                  onClick={() => setCurrentForm(EnumPatientForm.CONTACT)}
                />
                <Button
                  type="submit"
                  variant="filled"
                  text="Submit"
                  isLoading={isLoading.regPatient}
                  disabled={isLoading.regPatient}
                />
              </div>
            </form>
          </FormProvider>
        );
      default:
        break;
    }
  };

  return (
    <CardContent className="flex w-full flex-col space-y-4 rounded-lg bg-white p-4">
      {switchDetails(currentForm)}
    </CardContent>
  );
};

export default observer(PatientRegView);
