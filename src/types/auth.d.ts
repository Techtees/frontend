type TVerifyOTPPayload = { otp: string };
type TGetProfile = INBTServerResp<TProfileInfo>;

type TPatientInfoResp = {
  id: string;
  email: string;
  isProfileCompleted: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  maritalStatus: boolean;
  profileStatus: boolean;
  patientPersonal: {
    id: string;
    maritalStatus: string;
    gender: string;
    dateOfBirth: string;
    weight: string;
    height: string;
  };
  patientContact: {
    id: string;
    homeAddress: string;
    city: string;
    state: string;
    landmark: string;
    zipCode: string;
  };
  patientEmergencyContact: {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
  };
  patientInsurance?: {
    primaryInsuranceProvider: string;
    insurancePlanName: string;
    policyNumber: string;
    groupNumber: string;
    insurancePhoneNumber: string;
    policyHolder?: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
    };
  };
  patientPolicyHolder: null;
};
