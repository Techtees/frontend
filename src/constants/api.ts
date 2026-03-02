import { ALL } from 'dns';

export const AUTH = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  OTP: '/users/verify-otp',
  GET_PROFILE: '/users/profile',
  NEW_ACCESS_TOKEN: '/users/refresh-token',
  FORGOT_PWD: '/users/forgot-password',
  NEW_PWD: '/users/reset-password',
  CHANGE_PWD: '',
  RESEND_EMAIL_VERIFICATION: '/users/resend-email-verification',
  UPDATE_PATIENT_PROFILE: '/users/patient/update-profile',
  ALL_PATIENT: '/users/patient/all',
  SINGLE_PATIENT: '/users/patient/:id',
  PATIENT_APPOINTMENTS: '/users/patients/:id/appointments'
} as const;

export const PATIENT = {
  PERSONAL_REG: '/patients/register',
  DASHBOARD: '/patients/dashboard',
  PROFILE: '/patients/profile',
  RECENT_RESULT: '/patients/dashboard/recent-activity',
  BILLING: '/payments' as string,
  DOCTORS_FEES: '/super-admin/features',

  APPOINTMENTS: {
    UPCOMING: '/patients/appointments/upcoming',
    PENDING: '/patients/appointments/pending',
    PAST: '/patients/appointments/past',
    CREATE: 'patients/appointments',
    DETAILS: (id: string) => `patients/appointments/${id}/show`,
    CANCEL: (id: string) => `/appointments/${id}/cancel`,
    RESCHEDULE: (id: string) => `patients/appointments/${id}/reschedule`,
    PENDING_PAYMENT: (id: string) => `patients/appointments/${id}/payment/generate`,
    VERIFY_PAYMENT: (tx_Ref: string) => `/payments/verify/${tx_Ref}`
  } as const,

  TESTS: {
    ALl: '/tests/all-tests?page=1&limit=20&status=ACTIVE',
    PACKAGES: '/tests/package-tests?page=1&limit=20&status=ACTIVE',
    DETAILS: (id: string) => `/tests/${id}`,
    SINGLE: '/test/single',
    ALL_TESTS_CATEGORY: '/tests/all'
  },

  TEST_RESULTS: {
    ALL: 'tests/test-results' as string,
    DETAILS: (id: string) => `/tests/patient-test-results/${id}`,
    SUITE_DETAILS: (id: string) => `/patients/APPOINTMENTS/${id}/details`
  }
} as const;

export const DOCTOR = {
  DASHBOARD: '/doctors/dashboard',
  RECENT_ACTIVITY: '/doctors/recent-activity',
  TEST_REVIEW: {
    All: '/doctors/test-requests',
    DETAILS: (id: string) => `/doctors/test-requests/${id}`
  },
  APPOINTMENT: {
    ALL: '/doctors/appointments/booked-by-doctor',
    CREATE: '/doctors/appointments'
  },
  REFERRALS: '/doctors/patients',
  UPDATE_AVAILABILITY: '/doctors/update-availability'
};

export const MARKETER = {
  DASHBOARD: '/marketer/dashboard',
  FIELD_TASK_OVERVIEW: '/marketer/field-tasks/overview',
  FIELD_TASK_HISTORY: '/marketer/field-tasks/overview-history',
  SHOW_FIELD_TASK: '/marketer/field-tasks/:id',
  LOG_SAMPLES: {
    All: '/marketer/field-tasks/overview?status=pending',
    UPLOAD: '/marketer/field-tasks/:id/log-samples',
    UPDATE_FIELD_VISIT: 'marketer/field-tasks/:id/status'
  },
  UPDATE_AVAILABILITY: '/marketer/update-availability'
};

export const LAB_TECH = {
  DASHBOARD: '/lab-technicians/dashboard',
  RECENT_ACTIVITIES: '/lab-technicians/dashboard/recent-activities',
  ALL_TESTS: '/lab-technicians/test-requests',
  GET_TEST: '/lab-technicians/test-requests/:id',
  RECENT_RESULTS: '/lab-technicians/recent-test-results',
  ARCHIVED_RESULTS: '/lab-technicians/archived-test-results',
  HISTORY_QC: '/lab-technicians/quality-control-history',
  UPDATE_TEST_STATUS: '/lab-technicians/test-requests/:id/status',
  UPADTE_AVAILABILITY: '/lab-technicians/update-availability',
  TEST_TEMPLATES: '/test-templates'
} as const;

export const LAB_COORD = {
  ALL_TESTS: '/lab-coordinator/test-requests',
  GET_TEST: '/lab-coordinator/test-requests/:id',
  DASHBOARD: '/lab-coordinator/dashboard',
  STAFF_SHIFTS: '/lab-coordinator/staff-shifts',
  AVAILABLE_TECHNICIAN: '/lab-coordinator/available-technicians',
  AVAILABLE_MARKETERS: '/lab-coordinator/available-marketers',
  AVAILABLE_DOCTORS: '/lab-coordinator/available-doctors',
  INVENTORY: '/lab-coordinator/inventory'
} as const;

export const QUALITY_CONTROL = {
  PENDING: '/qc/pending',
  HISTORY: '/qc/history',
  UPDATE_STATUS: '/qc/status/:id'
};

export const TEST = {
  GET_ALL: '/tests/all-tests',
  GET_SINGLE: '/tests/single/:id',
  UPDATE_TEST: '/tests/update/:id',
  TOGGLE_STATUS: '/tests/toggle-status/:id',
  GET_RESULTS: '/tests/test-results',
  GET_SINGLE_RESULT: '/tests/test-results/:id',
  GET_REQUESTS: '/tests/test-requests',
  GET_SINGLE_REQUEST: '/tests/test-requests/single/:id',
  UPLOAD_RESULT: '/tests/upload-test-result/:id',
  ASSIGN_TEST: '/tests/assign-technician',
  REASSIGN_TEST: '/tests/reassign-technician',
  ASSIGN_MARKETER: '/tests/assign-marketer',
  REASSIGN_MARKETER: '/tests/reassign-marketer',
  ASSIGN_DOCTOR: '/tests/assign-doctor',
  REASSIGN_DOCTOR: '/tests/reassign-doctor',
  ASSIGNED_TESTS: '/tests/fetch-assigned-test',
  SINGLE_ASSIGNED_TESTS: '/tests/fetch-assigned-test/:id',
  ALL_ASSIGNED: '/tests/assigned-tests'
};

export const RECEPTIONIST = {
  DASHBOARD: '/receptionist/dashboard',
  APPOINTMENTS: '/receptionist/appointments',
  BOOK_APPOINTMENT: '/receptionist/appointments',
  SINGLE_APPOINTMENT: '/receptionist/appointment/:id',
  UPDATE_APPOINTMENT: '/receptionist/appointments/update/:id'
};

export const SUPER_ADMIN = {
  STATS: '/super-admin/dashboard/stats',
  USERS: '/super-admin/users',
  ADD_USER: '/super-admin/add-user',
  PATIENTS: '/users/patient/all',
  SINGLE_TEST: '/tests/all-tests',
  PACKAGE_TEST: '/admin/package-tests',
  SINGLE_PACKAGE_TEST: '/tests/single-package-tests/:id',
  TEST_ID: '/tests/single/:id',
  CREATE_SINGLE_TEST: '/tests/create',
  CREATE_PACKAGE_TEST: '/admin/package-tests',
  TEST_TEMPLATES: '/test-templates',
  TEST_TEMPLATE_ID: '/test-templates/:testId',
  DELETE_USER: '/super-admin/users/:id',
  SUSPEND_USER: '/super-admin/users/:id/suspend',
  UNSUSPEND_USER: '/super-admin/users/:id/status',
  TOGGLE_TEST_AVAILABILITY: '/tests/toggle-status/:id',
  UPDATE_SINGLE_TEST: '/tests/update/:id',
  UPDATE_PACKAGE_TEST: '/admin/package-tests/:id',
  TOGGLE_PACKAGE_TEST: '/admin/package-tests/:id/toggle-status',
  RESULT_CHART: '/super-admin/test-results/stats',
  PAYMENT_CHART: '/super-admin/payments/stats',
  LANDING_PAGE: '/super-admin/content-hero-sections/landing',
  CREATE_LANDING: '/super-admin/content-hero-sections',
  SINGLE_LANDING: '/super-admin/content-hero-sections/:id',
  TESTIMONIALS: '/super-admin/content-testimonials',
  SINGLE_TESTIMONIAL: '/super-admin/content-testimonials/:id',
  CONTENT_PARTNERS: '/super-admin/content-partners',
  DOCTORS_FEES: '/super-admin/features',
  UPDATE_DOCTOR_FEE: '/super-admin/features/:id'
};

export const UPLOADS = {
  MEDIA: '/file-manager/media',
  DELETE: '/file-manager/media/:uuid'
} as const;

export const SETTINGS = {
  // profile
  PROFILE: '/settings/profile',
  PROFILE_PHOTO: '/settings/profile-photo',

  // privacy
  RESEND_EMAIL_VERIFICATION: '/settings/resend-email-verification',
  VERIFY_OTP: '/settings/verify-otp',
  UPDATE_PWD: '/settings/update-password',
  RECOVERY_CONTACT: '/settings/recovery-contacts',

  // billing
  BILLING: '/settings/billing',
  PREFERENCES: '/settings/preferences',

  // others
  DEACTIVATE: '/settings/account',
  RESTORE: '/settings/account-restore',

  // notifications
  NOTIFICATIONS: '/settings/notification'
};

export const NOTIFICATIONS = {
  TOGGLE: '/notifications/fcm-token',
  GET_ALL: '/notifications',
  READ_ALL: '/notifications/read-all',
  MARK_AS_READ: '/notifications/:id/read'
};

export const FILE_MANAGER = {
  UPDATE_VISIBILITY: '/file-manager/update-visibility/:uuid'
};
