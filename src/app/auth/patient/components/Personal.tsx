'use client';
import Button from '@/atoms/Buttons';
import { SubTitle } from '@/atoms/typographys';
import { gender, maritalStatus } from '@/constants/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PatientPersonalSchema, TPatientPersonalSchema } from '../../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useEffect, useMemo, useState } from 'react';
import { EnumRole } from '@/constants/mangle';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/atoms/fields/NewInput';
import InputNumPatternField from '@/atoms/fields/PhoneNumberInput';
import InputDate from '@/atoms/fields/InputDate';
import InputSelect from '@/atoms/fields/NewInputSelect';
import InputPhoneField from '@/atoms/fields/InputPhone';

function PersonalForm() {
  const { data, isLoading } = useFetchProfile();
  const {
    PatientStore: { personalInfo, setPersonalInfo },
    AuthStore: { user }
  } = useStore();
  const [disable, setDisable] = useState(false);
  const currentYear = new Date().getFullYear();
  const minDobDate = new Date(1920, 0, 1);

  const defaultValues = useMemo(() => {
    let values = {};
    if (user && user.role === EnumRole.PATIENT) {
      values = { ...data };
    }
    values = { ...personalInfo };

    return values;
  }, [data, user, personalInfo]);

  const form = useForm<TPatientPersonalSchema>({
    defaultValues,
    mode: 'onSubmit',
    resolver: zodResolver(PatientPersonalSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TPatientPersonalSchema> = async (formData) => {
    setPersonalInfo(formData);
  };

  useEffect(() => {
    form.reset(personalInfo);
    if (personalInfo.height) {
      form.setValue('height', String(personalInfo.height));
    }

    setDisable(user && user.role === EnumRole.PATIENT);

    if (personalInfo.weight) {
      form.setValue('weight', String(personalInfo.weight));
    }
    if (personalInfo.gender) {
      form.setValue('gender', personalInfo.gender);
    }
  }, []);

  useEffect(() => {
    if (disable) {
      if (!isLoading && data !== undefined) {
        form.setValue('firstName', data.first_name as string);
        form.setValue('lastName', data.last_name as string);
        form.setValue('email', data.email as string);
        form.setValue('phoneNumber', data?.phone ? data.phone : '');
      }
    }
  }, [isLoading, data, disable]);

  return (
    <div className="flex w-full flex-col space-y-4 rounded-lg bg-white">
      <SubTitle className="!text-center" text="Personal Information" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="w-full">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField
                      required
                      className="md:mb-0 md:w-[50%]"
                      type="text"
                      id="fname"
                      label="First Name"
                      placeholder="Adeolu"
                      disabled={disable}
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField
                      required
                      className="md:mb-0 md:w-[50%]"
                      type="text"
                      id="lname"
                      label="Last Name"
                      placeholder="John"
                      disabled={disable}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div>
                  <InputField
                    type="text"
                    id="email"
                    label="Email"
                    placeholder="johndoes@gmail.com"
                    {...field}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <InputPhoneField
                  required
                  label="Phone number"
                  placeholder="8123456789"
                  defaultCountry="NG"
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <InputDate
                  label="Date of Birth"
                  placeholder="Jan 1, 2000"
                  granularity="day"
                  hourCycle={12}
                  displayFormat={{ hour24: 'yyyy/MM/dd' }}
                  value={field.value}
                  onChange={field.onChange}
                  hidden={{ after: new Date(), before: minDobDate }}
                  showTime={false}
                  minYear={1920}
                  maxYear={currentYear}
                  required
                />
              )}
            />

            <div className="">
              <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <div className="md:w-[50%]">
                      <InputSelect
                        label="Gender"
                        placeholder="Select a gender"
                        items={gender}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required
                        {...field}
                      />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <div className="md:w-[50%]">
                      <InputSelect
                        label="Marital status"
                        placeholder="Select a status"
                        items={maritalStatus}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...field}
                      />
                    </div>
                  )}
                />
              </div>

              <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputNumPatternField
                        id="weight"
                        label="Weight (kg)"
                        format="%%%"
                        patternChar="%"
                        max={700}
                        {...field}
                      />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputNumPatternField
                        id="height"
                        label="Height (cm)"
                        format="%%%"
                        patternChar="%"
                        max={300}
                        {...field}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </fieldset>

          <Button type="submit" variant="filled">
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default observer(PersonalForm);
