'use client';
import Button from '@/atoms/Buttons';
import { SubTitle } from '@/atoms/typographys';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PatientContactSchema, TPatientContactSchema } from '../../validation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnumPatientForm } from '@/constants/mangle';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/atoms/fields/NewInput';
import InputNumPatternField from '@/atoms/fields/PhoneNumberInput';
import InputPhoneField from '@/atoms/fields/InputPhone';

function ContactForm() {
  const {
    PatientStore: { contactInfo, setContactInfo, setCurrentForm }
  } = useStore();
  const form = useForm<TPatientContactSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(PatientContactSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TPatientContactSchema> = async (formData) => {
    setContactInfo(formData);
  };

  useEffect(() => {
    form.reset(contactInfo);
  }, []);
  return (
    <div className="flex w-full flex-col space-y-4 rounded-lg bg-white">
      <SubTitle className="!text-center" text="Contact Information" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <fieldset className="">
            <FormField
              control={form.control}
              name="homeAddress"
              render={({ field }) => (
                <div>
                  <InputField
                    required
                    className="md:mb-0 md:w-[50%]"
                    type="text"
                    id="fname"
                    label="Home address"
                    placeholder="No 65 Block B1 Westros Est."
                    {...field}
                  />
                </div>
              )}
            />
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField
                      required
                      type="text"
                      id="fname"
                      label="City"
                      placeholder="Akure"
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField
                      required
                      type="text"
                      id="fname"
                      label="State"
                      placeholder="Ondo"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <FormField
                control={form.control}
                name="landMark"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField
                      type="text"
                      id="fname"
                      label="Landmark"
                      placeholder="behind C.B.N Office"
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputNumPatternField
                      id="zipCode"
                      label="Zip code"
                      format="%%%%%%"
                      patternChar="%"
                      maxLength={6}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <label className="mb-3 font-medium">
              <div className="flex items-center justify-start space-x-1">
                <label className="">Emergency Contact</label>
              </div>
            </label>

            <div className="mt-3">
              <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
                <FormField
                  control={form.control}
                  name="emergencyContact.firstName"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputField
                        type="text"
                        id="emergencyContact.firstName"
                        label="First Name"
                        {...field}
                      />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContact.lastName"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputField
                        type="text"
                        id="emergencyContact.lastName"
                        label="Last Name"
                        {...field}
                      />
                    </div>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="emergencyContact.address"
                render={({ field }) => (
                  <InputField
                    type="text"
                    id="emergencyContact.address"
                    label="Address"
                    {...field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="emergencyContact.phoneNumber"
                render={({ field }) => <InputPhoneField label="Phone number" {...field} />}
              />
            </div>
          </fieldset>

          <div className="flex items-center justify-between space-x-2">
            <Button
              type="button"
              variant="transparent"
              text="Prev"
              onClick={() => setCurrentForm(EnumPatientForm.PEROSNAL)}
            />
            <Button type="submit" variant="filled" text="Next" />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default observer(ContactForm);
