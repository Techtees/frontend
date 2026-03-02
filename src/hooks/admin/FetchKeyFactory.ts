import { SUPER_ADMIN } from '@/constants/api';
import { get } from 'lodash';

export const superAdmin = {
  getStats() {
    return {
      path: SUPER_ADMIN.STATS,
      keys: () => [SUPER_ADMIN.STATS] as const
    };
  },

  getUsers(query: Partial<TGeneralPaginatedQuery>) {
    return {
      path: SUPER_ADMIN.USERS,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.USERS, query] as const,
      params: query
    };
  },

  getSingleTest(query: Partial<TAdminTestQuery>) {
    return {
      path: SUPER_ADMIN.SINGLE_TEST,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.SINGLE_TEST, query],
      params: query
    };
  },

  getPackageTest(query: Partial<TAdminTestQuery>) {
    return {
      path: SUPER_ADMIN.PACKAGE_TEST,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.PACKAGE_TEST, query] as const,
      params: query
    };
  },

  getTestById(id: string) {
    return {
      path: SUPER_ADMIN.TEST_ID.replace(':id', id),
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.TEST_ID, id] as const
    };
  },

  getPackageTestById(id: string) {
    return {
      path: SUPER_ADMIN.SINGLE_PACKAGE_TEST.replace(':id', id),
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.SINGLE_PACKAGE_TEST, id] as const
    };
  },

  getTestTemplates() {
    return {
      path: SUPER_ADMIN.TEST_TEMPLATES,
      keys: () => [SUPER_ADMIN.TEST_TEMPLATES] as const
    };
  },

  getTestTemplateById(testId: string) {
    return {
      path: SUPER_ADMIN.TEST_TEMPLATES,
      keys: () => [SUPER_ADMIN.TEST_TEMPLATES, testId] as const,
      params: { testId }
    };
  },

  getTestResultChart(query: TChartQuery) {
    return {
      path: SUPER_ADMIN.RESULT_CHART,
      keys: () => [SUPER_ADMIN.RESULT_CHART, query],
      params: query
    };
  },

  getPaymentChart(query: TChartQuery) {
    return {
      path: SUPER_ADMIN.PAYMENT_CHART,
      keys: () => [SUPER_ADMIN.PAYMENT_CHART, query],
      params: query
    };
  },

  getHeroSection() {
    return {
      path: SUPER_ADMIN.LANDING_PAGE,
      keys: () => [SUPER_ADMIN.LANDING_PAGE]
    };
  },

  getHeroSectionId(id: string) {
    return {
      path: SUPER_ADMIN.SINGLE_LANDING.replace(':id', id),
      keys: () => [SUPER_ADMIN.LANDING_PAGE, SUPER_ADMIN.SINGLE_LANDING, id]
    };
  },

  getTestimonial() {
    return {
      path: SUPER_ADMIN.TESTIMONIALS,
      keys: () => [SUPER_ADMIN.TESTIMONIALS]
    };
  },

  getTestimonialId(id: string) {
    return {
      path: SUPER_ADMIN.SINGLE_TESTIMONIAL.replace(':id', id),
      keys: () => [SUPER_ADMIN.TESTIMONIALS, SUPER_ADMIN.SINGLE_TESTIMONIAL, id]
    };
  },

  getPartners() {
    return {
      path: SUPER_ADMIN.CONTENT_PARTNERS,
      keys: () => [SUPER_ADMIN.CONTENT_PARTNERS]
    };
  },

  getDoctorsFees() {
    return {
      path: SUPER_ADMIN.DOCTORS_FEES,
      keys: () => [SUPER_ADMIN.DOCTORS_FEES]
    };
  },

  getPatients(query: Partial<TAdminPatientQuery>) {
    return {
      path: SUPER_ADMIN.PATIENTS,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.PATIENTS, query] as const,
      params: query
    };
  }
};
