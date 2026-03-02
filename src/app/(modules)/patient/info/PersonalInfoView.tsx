'use client';
import { Text } from '@/lib/utils/Text';
import Input from '@/atoms/fields/Input';
import { Label } from '@radix-ui/react-dropdown-menu';

import { usePatientInfo } from '@/hooks/patient/usePatientDashboard';
import InfoCardLoader from './components/InfoCardLoader';

const PersonalInfoView = () => {
  const { data, isLoading } = usePatientInfo();

  if (isLoading) {
    return <InfoCardLoader />;
  }
  return (
    <div>
      <div className="relative h-[94px] rounded-lg bg-blue-400 ">
        <div className="absolute left-1/2 top-[6rem] h-[163px] w-[163px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-neutral-100 " />
      </div>
      <div className="mt-[7rem] bg-white p-3  md:p-[16px] lg:p-[24px]">
        <Text variant="title" weight="semibold" align="center" className="mb-4">
          Personal Information
        </Text>
        <div className="flex flex-col ">
          <Label className="mb-1 text-sm">Full Name</Label>
          <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
            <Input
              type="text"
              placeholder="First name"
              defaultValue={data?.data?.personal.firstName}
            />
            <Input
              type="text"
              placeholder="Last name"
              defaultValue={data?.data?.personal.lastName}
            />
          </div>
        </div>
        <Input type="email" label="Email" defaultValue={data?.data?.personal.email} />
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="text" label="Phone Number" defaultValue={data?.data.personal.phoneNumber} />
          <Input
            type="text"
            label="Married Status"
            defaultValue={data?.data?.personal.maritalStatus}
          />
        </div>
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="text" label="Gender" defaultValue={data?.data?.personal.gender} />
          <Input
            type="date"
            label="Date of birth"
            defaultValue={data?.data?.personal.dateOfBirth}
          />
        </div>
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="number" label="Weight" defaultValue={data?.data?.personal.weight} />
          <Input type="number" label="Height" defaultValue={data?.data?.personal.height} />
        </div>
        <Input type="text" label="Primary Care Physician" />
      </div>

      <div className="mt-6  flex flex-col gap-6 md:gap-4 lg:flex-row lg:gap-6">
        <div className="mb-8 w-full bg-white p-3 md:p-4 lg:p-6">
          <Text variant="title" weight="semibold" align="center" className="mb-4">
            Insurance Information
          </Text>

          <Input
            type="text"
            label="Primary Insurance Provider"
            defaultValue={data?.data?.insurance.primaryInsuranceProvider}
          />
          <Input type="text" label="Insurance Plan Name" />
          <div className="flex flex-col gap-1 sm:flex-row md:gap-4">
            <Input
              type="text"
              label="Policy Number"
              defaultValue={data?.data?.insurance.policyNumber}
            />
            <Input
              type="text"
              label="Group Number"
              defaultValue={data?.data?.insurance.groupNumber}
            />
          </div>
          <Input
            type="text"
            label="Policy Holder Name"
            defaultValue={`${data?.data?.insurance.policyHolder.firstName} ${data?.data.insurance.policyHolder.lastName} `}
          />
          <Input
            type="text"
            label="Insurance Phone Number"
            defaultValue={data?.data?.insurance.policyNumber}
          />
          <Input
            type="text"
            label="Policy Holder Phone number"
            defaultValue={data?.data?.insurance.policyHolder.phoneNumber}
          />
        </div>
        <div className="mb-8 w-full bg-white p-3 md:p-4 lg:p-6">
          <Text variant="title" weight="semibold" align="center" className="mb-4">
            Contact Information
          </Text>

          <Input type="text" label="Home Address" defaultValue={data?.data?.contact.homeAddress} />
          <div className="flex flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" label="City" defaultValue={data?.data?.contact.city} />
            <Input type="text" label="State" defaultValue={data?.data?.contact.state} />
          </div>
          <div className="flex flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" label="Landark" defaultValue={data?.data?.contact.landMark} />
            <Input type="text" label="Postal Code" defaultValue={data?.data?.contact.zipCode} />
          </div>
          <Input
            type="text"
            label="Emergency Contact Information"
            defaultValue={`${data?.data.contact.emergencyContact.firstName} ${data?.data?.contact.emergencyContact.lastName}`}
          />
          <Input
            type="text"
            label="Emergency Contact Information Address"
            defaultValue={data?.data?.contact.emergencyContact.address}
          />
          <Input
            type="email"
            label="Emergency Contact Information Phone"
            defaultValue={data?.data?.contact.emergencyContact.phoneNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoView;
