import { action, flow, makeObservable, observable, toJS } from 'mobx';
import { RootStore } from '..';
import {
  TPatientContactSchema,
  TPatientInsuranceSchema,
  TPatientPersonalSchema
} from '@/app/auth/validation';
import store from 'store2';
import initializer from '@/utils/initializer';
import { EnumPatientForm, Mangle } from '@/constants/mangle';
import { parseError } from '@/utils/errorHandler';
import { postRegPatient, putRegPatient, TPatientRegPayload } from '@/requests/patient';
import ROUTES from '@/constants/routes';
import toast from 'react-hot-toast';

const persist = <T = string>(key: string, value: T) => {
  store.namespace('pat').session.set(key, value);
  return value;
};

const get = <T = string>(key: string, fallback?: T) => {
  return store.namespace('pat').session.get(key, fallback) as T;
};

const del = (key: string) => {
  return store.namespace('pat').session.remove(key);
};

const INIT_IS_LOADING = {
  regPatient: false
};

class PatientStore {
  rootStore: RootStore;
  isLoading = { ...INIT_IS_LOADING };
  errors = initializer(this.isLoading, '');
  currentForm = get<EnumPatientForm>(Mangle.PATIENT_CURRENT_FORM, EnumPatientForm.PEROSNAL);
  personalInfo = get<Partial<TPatientPersonalSchema>>(Mangle.PATIENT_PERSONAL_INFO, {});
  contactInfo = get<Partial<TPatientContactSchema>>(Mangle.PATIENT_CONTACT_INFO, {});
  insuranceInfo = get<Partial<TPatientInsuranceSchema>>(Mangle.PATIENT_INSURANCE_INFO, {});

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      isLoading: observable,
      errors: observable,
      currentForm: observable,
      personalInfo: observable,
      contactInfo: observable,
      insuranceInfo: observable,

      resetPatientStore: action.bound,
      setPersonalInfoPersist: action.bound,
      setCurrentForm: action.bound,
      setPersonalInfo: action.bound,
      setContactInfo: action.bound,
      setInsuranceInfo: action.bound,
      receptSetPatientInfo: action.bound,

      registerPatient: flow.bound,
      updatePatient: flow.bound
    });
    this.rootStore = _rootStore;
  }

  resetPatientStore() {
    del(Mangle.PATIENT_PERSONAL_INFO);
    del(Mangle.PATIENT_CONTACT_INFO);
    del(Mangle.PATIENT_INSURANCE_INFO);
    del(Mangle.PATIENT_CURRENT_FORM);
    this.currentForm = EnumPatientForm.PEROSNAL;
    this.personalInfo = {};
    this.contactInfo = {};
    this.insuranceInfo = {};
  }

  setPersonalInfoPersist(payload: Partial<TPatientPersonalSchema>) {
    persist(Mangle.PATIENT_PERSONAL_INFO, payload);
  }

  setCurrentForm(_form: EnumPatientForm) {
    this.currentForm = _form;
    persist(Mangle.PATIENT_CURRENT_FORM, _form);
  }

  setPersonalInfo(payload: TPatientPersonalSchema) {
    this.personalInfo = persist(Mangle.PATIENT_PERSONAL_INFO, payload);
    this.currentForm = EnumPatientForm.CONTACT;
    this.setCurrentForm(EnumPatientForm.CONTACT);
  }

  setContactInfo(payload: TPatientContactSchema) {
    this.contactInfo = persist(Mangle.PATIENT_CONTACT_INFO, payload);
    this.currentForm = EnumPatientForm.INSURANCE;
    this.setCurrentForm(EnumPatientForm.INSURANCE);
  }

  setInsuranceInfo(payload: TPatientInsuranceSchema, cb: () => void) {
    this.insuranceInfo = persist(Mangle.PATIENT_INSURANCE_INFO, payload);
    persist(Mangle.PATIENT_CURRENT_FORM, EnumPatientForm.INSURANCE);
    cb();
  }

  receptSetPatientInfo(info: TPatientInfoResp) {
    this.personalInfo = {
      firstName: info?.firstName ?? '',
      lastName: info?.lastName ?? '',
      phoneNumber: info?.phoneNumber ?? '',
      email: info?.email ?? '',
      maritalStatus: info?.patientPersonal?.maritalStatus ?? '',
      gender: info?.patientPersonal?.gender ?? '',
      dateOfBirth: info?.patientPersonal?.dateOfBirth
        ? new Date(info?.patientPersonal?.dateOfBirth)
        : new Date(),
      weight: info?.patientPersonal?.weight ?? '',
      height: info?.patientPersonal?.height ?? ''
    };

    this.contactInfo = {
      homeAddress: info?.patientContact?.homeAddress ?? '',
      city: info?.patientContact?.city ?? '',
      state: info?.patientContact?.state ?? '',
      landMark: info?.patientContact?.landmark ?? '',
      zipCode: info?.patientContact?.zipCode ?? '',

      emergencyContact: {
        firstName: info?.patientEmergencyContact?.firstName ?? '',
        lastName: info?.patientEmergencyContact?.lastName ?? '',
        address: info?.patientEmergencyContact?.address ?? '',
        phoneNumber: info?.patientEmergencyContact?.phoneNumber ?? ''
      }
    };

    this.insuranceInfo = {
      primaryInsuranceProvider: info?.patientInsurance?.primaryInsuranceProvider ?? '',
      insurancePlanName: info?.patientInsurance?.insurancePlanName ?? '',
      policyNumber: info?.patientInsurance?.policyNumber ?? '',
      groupNumber: info?.patientInsurance?.groupNumber ?? '',
      insurancePhoneNumber: info?.patientInsurance?.insurancePhoneNumber ?? '',
      policyHolder: {
        firstName: info?.patientInsurance?.policyHolder?.firstName ?? '',
        lastName: info?.patientInsurance?.policyHolder?.lastName ?? '',
        phoneNumber: info?.patientInsurance?.policyHolder?.phoneNumber ?? ''
      }
    };
  }

  *registerPatient(cb: () => void) {
    this.isLoading.regPatient = true;
    try {
      const payload: TPatientRegPayload = {
        personal: this.personalInfo as TPatientPersonalSchema,
        contact: this.contactInfo as TPatientContactSchema,
        insurance: this.insuranceInfo as TPatientInsuranceSchema
      };
      const {
        data: { message }
      } = (yield postRegPatient(payload)) as { data: INBTServerResp<{ access_token: string }> };

      toast.success(message);
      this.resetPatientStore();
      cb();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.regPatient = false;
    }
  }

  *updatePatient(cb?: (url: string) => void) {
    this.isLoading.regPatient = true;
    try {
      const payload: Partial<TPatientRegPayload> = {
        personal: this.personalInfo as TPatientPersonalSchema,
        contact: this.contactInfo as TPatientContactSchema,
        insurance: this.insuranceInfo as TPatientInsuranceSchema
      };

      const {
        data: { message }
      } = (yield putRegPatient(payload)) as { data: INBTServerResp<{ access_token: string }> };

      toast.success(message);
      this.resetPatientStore();
      cb && cb(ROUTES.PATIENT.path);
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.regPatient = false;
    }
  }
}

export default PatientStore;
