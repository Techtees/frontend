'use client';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { ProfileSettingSchema, TProfileSettingsSchema } from './validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/atoms/fields/NewInput';
import InputNumPatternField from '@/atoms/fields/PhoneNumberInput';
import InputDate from '@/atoms/fields/InputDate';
import InputSelect from '@/atoms/fields/NewInputSelect';
import { gender, maritalStatus } from '@/constants/data';
import Button from '@/atoms/Buttons';
import { useFetchProfileSettings } from '@/hooks/settings/useFetchProfileSettings';
import { Skeleton } from '@/components/ui/skeleton';
import _ from 'lodash';
import { useStore } from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { SETTINGS } from '@/constants/api';
import { observer } from 'mobx-react-lite';
import toast from 'react-hot-toast';
import InputPhoneField from '@/atoms/fields/InputPhone';

const Profile = () => {
  const [profile, setProfile] = useState<Partial<TProfileSettingsSchema>>({});
  const currentYear = new Date().getFullYear();
  const minDobDate = new Date(1920, 0, 1);
  const { data, isLoading, status } = useFetchProfileSettings();
  const {
    SettingsStore: { updateProfile, isSettingsLoading }
  } = useStore();
  const form = useForm<TProfileSettingsSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(ProfileSettingSchema),
    reValidateMode: 'onSubmit'
  });

  const profileWatch = useWatch({ control: form.control });

  const hasChanged = _.isEqual(profile, profileWatch);
  const queryClient = useQueryClient();

  const getChangedFields = (
    original: Partial<TProfileSettingsSchema>,
    current: TProfileSettingsSchema
  ) => {
    return _.pickBy(current, (value, key) => {
      return !_.isEqual(original[key as keyof typeof original], value);
    });
  };

  const onSubmit = (formData: TProfileSettingsSchema) => {
    const changedValue = getChangedFields(profile, formData);

    if (Object.keys(changedValue).length > 0) {
      updateProfile(changedValue, () =>
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] == SETTINGS.PROFILE
        })
      );
    } else {
      toast.success('Nothing to update.');
    }
  };

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        phoneNumber,
        contactAddress,
        city,
        maritalStatus,
        gender,
        zipCode,
        landMark
      } = data;

      const profileData: Partial<TProfileSettingsSchema> = {
        firstName,
        lastName,
        email,
        phoneNumber: phoneNumber.slice(4),
        contactAddress,
        city,
        maritalStatus,
        gender,
        zipCode,
        landMark: landMark ?? ''
      };

      if (dateOfBirth) {
        profileData.dateOfBirth = new Date(data.dateOfBirth);
      }

      setProfile(profileData);
      form.reset(profileData);
    }
  }, [data, isLoading]);

  return (
    <div className="flex w-full flex-col space-y-4">
      {status === 'pending' && (
        <>
          <Skeleton className="h-40" />
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </>
      )}
      {status === 'success' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
            <fieldset className="">
              <div className="mb-1 flex flex-col md:flex-row  md:justify-between md:space-x-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputField disabled label="first Name" placeholder="John" {...field} />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputField disabled label="Last Name" placeholder="Doe" {...field} />
                    </div>
                  )}
                />
              </div>
              <div className="mb-1 flex flex-col md:flex-row  md:justify-between md:space-x-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputField
                        disabled
                        type="email"
                        label="Email Address"
                        placeholder="adeolu@gmail.com"
                        {...field}
                      />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputPhoneField label="Phone number" {...field} />
                    </div>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="contactAddress"
                render={({ field }) => (
                  <div>
                    <InputField label="Home address" placeholder="" {...field} />
                  </div>
                )}
              />
              <div className="mb-1 flex flex-col md:flex-row md:justify-between md:space-x-4">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <div className="md:w-[50%]">
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
                      />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputField label="Zip code" placeholder="" {...field} />
                    </div>
                  )}
                />
              </div>

              <div className="mb-1 flex flex-col md:flex-row  md:justify-between md:space-x-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputField label="City" placeholder="" {...field} />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="landMark"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputField label="Land mark" placeholder="" {...field} />
                    </div>
                  )}
                />
              </div>

              <div className="mb-1 flex flex-col md:flex-row  md:justify-between md:space-x-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field: { onChange, value, ...f } }) => (
                    <div className="md:w-[50%]">
                      <InputSelect
                        label="Gender"
                        placeholder="Select a gender"
                        items={gender}
                        onChange={onChange}
                        value={value}
                        {...f}
                      />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field: { onChange, value, ...f } }) => (
                    <div className="md:w-[50%]">
                      <InputSelect
                        label="Marital status"
                        placeholder="Select a status"
                        items={maritalStatus}
                        onChange={onChange}
                        value={value}
                        {...f}
                      />
                    </div>
                  )}
                />
              </div>
            </fieldset>

            <div className="flex items-center justify-between space-x-4">
              <Button variant="outlined" disabled={hasChanged || isSettingsLoading.updateProfile}>
                clear
              </Button>
              <Button
                variant="filled"
                disabled={hasChanged || isSettingsLoading.updateProfile}
                isLoading={isSettingsLoading.updateProfile}
              >
                update changes
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default observer(Profile);
