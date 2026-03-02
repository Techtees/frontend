'use client';
import { SubTitle } from '@/atoms/typographys';
import { useFormContext } from 'react-hook-form';
import { TPatientInsuranceSchema } from '../../validation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useEffect } from 'react';
import { FormField } from '@/components/ui/form';
import InputField from '@/atoms/fields/NewInput';
import InputNumPatternField from '@/atoms/fields/PhoneNumberInput';
import InputPhoneField from '@/atoms/fields/InputPhone';

function InsuranceForm() {
  const {
    PatientStore: { isLoading, insuranceInfo }
  } = useStore();
  const form = useFormContext<TPatientInsuranceSchema>();

  const provider = form.watch('primaryInsuranceProvider');

  useEffect(() => {
    form.reset(insuranceInfo);
  }, []);

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-white py-6">
      <SubTitle className="!text-center" text="Insurance Information" />

      <fieldset disabled={isLoading.regPatient} className="">
        <FormField
          control={form.control}
          name="primaryInsuranceProvider"
          render={({ field }) => (
            <div>
              <InputField
                type="text"
                id="primaryInsuranceProvider"
                label="Primary insurance provider"
                placeholder="United Health"
                {...field}
              />
            </div>
          )}
        />

        <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
          <FormField
            control={form.control}
            name="insurancePlanName"
            render={({ field }) => (
              <div className="md:mb-0 md:w-[50%]">
                <InputField
                  disabled={Boolean(!provider)}
                  type="text"
                  id="insurancePlanName"
                  label="Insurance plan"
                  placeholder="Health"
                  {...field}
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="insurancePlanName"
            render={({ field }) => (
              <div className="md:mb-0 md:w-[50%]">
                <InputField
                  disabled={Boolean(!provider)}
                  type="text"
                  id="insurancePlanName"
                  label="Insurance plan"
                  placeholder="Health"
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="insurancePhoneNumber"
          render={({ field }) => (
            <div>
              <InputPhoneField label="Phone number" {...field} />
            </div>
          )}
        />
        <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
          <FormField
            control={form.control}
            name="policyNumber"
            render={({ field }) => (
              <div className="md:mb-0 md:w-[50%]">
                <InputNumPatternField
                  disabled={Boolean(!provider)}
                  id="policyNo"
                  label="Policy No"
                  format="%%%"
                  patternChar="%"
                  {...field}
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="groupNumber"
            render={({ field }) => (
              <div className="md:mb-0 md:w-[50%]">
                <InputNumPatternField
                  disabled={Boolean(!provider)}
                  id="policyNo"
                  label="Group No"
                  format="%%%"
                  patternChar="%"
                  {...field}
                />
              </div>
            )}
          />
        </div>

        <fieldset disabled={Boolean(!provider)}>
          <label className="mb-3 font-medium">Policy Holder</label>

          <div className="mt-3">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <FormField
                control={form.control}
                name="policyHolder.firstName"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField
                      disabled={Boolean(!provider)}
                      type="text"
                      id="insurancePlanName"
                      label="First Name"
                      placeholder="First name"
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="policyHolder.lastName"
                render={({ field }) => (
                  <div className="md:mb-0 md:w-[50%]">
                    <InputField
                      disabled={Boolean(!provider)}
                      type="text"
                      id="policyHolder.lastName"
                      label="Last Name"
                      placeholder="Last name"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="policyHolder.phoneNumber"
              render={({ field }) => (
                <div>
                  <InputPhoneField label="Phone number" {...field} />
                </div>
              )}
            />
          </div>
        </fieldset>
      </fieldset>
    </div>
  );
}

export default observer(InsuranceForm);
