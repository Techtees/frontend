import {
  TPatientContactSchema,
  TPatientInsuranceSchema,
  TPatientPersonalSchema
} from '@/app/auth/validation';
import server from '.';
import { AUTH, PATIENT } from '@/constants/api';
import { toJS } from 'mobx';

export type TPatientRegPayload = {
  personal: {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber: string;
    maritalStatus?: string;
    gender: string;
    dateOfBirth: Date;
    weight?: string | number;
    height?: string | number;
    primaryCarePhysician?: string | undefined;
  };
  contact: TPatientContactSchema;
  insurance: TPatientInsuranceSchema;
};

// post
export const postRegPatient = (payload: TPatientRegPayload) => {
  const { personal } = payload;

  if (personal.height) {
    personal.height = Number(personal.height);
  } else {
    personal.height = 0;
  }

  if (personal.weight) {
    personal.weight = Number(personal.weight);
  } else {
    personal.weight = 0;
  }
  return server.post<INBTServerResp<{ access_token: string }>>(PATIENT.PERSONAL_REG, payload);
};

// put
export const putRegPatient = (payload: Partial<TPatientRegPayload>) => {
  type TPatientPersonal = {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    height: number;
    weight: number;
    phoneNumber: string;
  };

  type TPatientContact = {
    homeAddress: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };

  type TPatientEmergencyContact = {
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber: string;
    address: string;
  };

  type TPatientInsurance = {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };

  type TPatientPolicyHolder = {
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber: string;
  };

  const patientPersonal: Partial<TPatientPersonal> = {};
  const patientContact: Partial<TPatientContact> = {};
  const patientEmergencyContact: Partial<TPatientEmergencyContact> = {};
  const patientInsurance: Partial<TPatientInsurance> = {};
  const patientPolicyHolder: Partial<TPatientPolicyHolder> = {};

  if (payload.personal?.firstName) patientPersonal.firstName = payload.personal.firstName;
  if (payload.personal?.lastName) patientPersonal.lastName = payload.personal.lastName;
  if (payload.personal?.email) patientPersonal.email = payload.personal.email;
  if (payload.personal?.dateOfBirth)
    patientPersonal.dateOfBirth = payload.personal.dateOfBirth.toDateString();
  if (payload.personal?.gender) patientPersonal.gender = payload.personal.gender;
  if (payload.personal?.height) patientPersonal.height = Number(payload.personal.height);
  if (payload.personal?.weight) patientPersonal.weight = Number(payload.personal.weight);
  if (payload.personal?.phoneNumber) patientPersonal.phoneNumber = payload.personal.phoneNumber;

  if (payload.contact?.homeAddress) patientContact.homeAddress = payload.contact.homeAddress;
  if (payload.contact?.city) patientContact.city = payload.contact.city;
  if (payload.contact?.state) patientContact.state = payload.contact.state;
  if (payload.contact?.zipCode) patientContact.zipCode = payload.contact.zipCode;

  if (payload?.contact?.emergencyContact?.firstName)
    patientEmergencyContact.firstName = payload?.contact?.emergencyContact.firstName;
  if (payload?.contact?.emergencyContact?.lastName)
    patientEmergencyContact.lastName = payload?.contact?.emergencyContact.lastName;
  if (payload?.contact?.emergencyContact?.phoneNumber)
    patientEmergencyContact.phoneNumber = payload?.contact?.emergencyContact.phoneNumber;
  if (payload?.contact?.emergencyContact?.address)
    patientEmergencyContact.address = payload?.contact?.emergencyContact.address;

  if (payload.insurance?.primaryInsuranceProvider)
    patientInsurance.provider = payload.insurance?.primaryInsuranceProvider;
  if (payload.insurance?.policyNumber)
    patientInsurance.policyNumber = payload.insurance.policyNumber;
  if (payload.insurance?.groupNumber) patientInsurance.provider = payload.insurance?.groupNumber;
  if (payload.insurance?.insurancePhoneNumber)
    patientInsurance.policyNumber = payload.insurance.insurancePhoneNumber;

  if (payload.insurance?.policyHolder?.firstName)
    patientPolicyHolder.firstName = payload.insurance?.policyHolder?.firstName;
  if (payload.insurance?.policyHolder?.lastName)
    patientPolicyHolder.lastName = payload.insurance?.policyHolder.lastName;
  if (payload.insurance?.policyHolder?.phoneNumber)
    patientPolicyHolder.phoneNumber = payload.insurance?.policyHolder?.phoneNumber;

  const finalPayload = {
    patientPersonal: Object.keys(patientPersonal).length > 0 ? patientPersonal : undefined,
    patientContact: Object.keys(patientContact).length > 0 ? patientContact : undefined,
    patientEmergencyContact:
      Object.keys(patientEmergencyContact).length > 0 ? patientEmergencyContact : undefined,
    patientInsurance: Object.keys(patientInsurance).length > 0 ? patientInsurance : undefined,
    patientPolicyHolder:
      Object.keys(patientPolicyHolder).length > 0 ? patientPolicyHolder : undefined
  };

  const cleanPayload = Object.fromEntries(
    Object.entries(finalPayload).filter(([_, value]) => value !== undefined)
  );

  return server.put<INBTServerResp<string>>(AUTH.UPDATE_PATIENT_PROFILE, cleanPayload);
};

// get
export const PatientDashboardService = async () => {
  const { data } = await server.get<TPatientDashboard>(PATIENT.DASHBOARD);
  return data;
};

export const PatientInfoService = async () => {
  const { data } = await server.get<InfoApiResponse>(PATIENT.PROFILE);
  return data;
};

export const PatientRecentResult = async () => {
  const { data } = await server.get<TPatientRecentTest>(PATIENT.RECENT_RESULT);
  return data;
};
