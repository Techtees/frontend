import { EnumRole } from './mangle';

class Route {
  path: string;
  title: string;
  description: string;
  roles: Array<string> = [];

  constructor(_path: string, _title: string, _description: string, _roles?: Array<string>) {
    this.path = _path;
    this.description = _description;
    this.title = _title;

    if (_roles) this.roles = _roles;
  }
}

class Routes {
  // landing
  HOME = new Route('/', ' Home', 'Home');
  LAB_TEST = new Route('/lab-test?tab=lab-tests', 'Lab Test', 'Individual Tests');
  SPECIAL_PACKAGES = new Route('/lab-test?tab=package-tests', 'Special Package', 'Special Package');
  ADVANCED_IMAGING = new Route(
    '/lab-test?tab=imaging-tests',
    'Advanced Imaging',
    'Advanced Imaging'
  );
  MOLECULAR_DIAGNOSTICS = new Route(
    '/lab-test?tab=molecular-tests',
    'Molecular Diagnostics',
    'Molecular Diagnostics'
  );
  BIO_HUB = new Route('/bio-hub', 'Bio Hub', 'Bio Hub');
  CONTACT_US = new Route('/contact-us', 'Contact Us', 'Contact Us');
  ECOMMERCE = new Route('/ecommerce', 'E-commerce', 'E-commerce');
  WHATS_NEW = new Route('/whats-new', 'Whats New', 'Whats New');
  CART = new Route('/cart', 'Nbiotek | Cart', 'Cart - Nbiotek');
  ABOUT = new Route('/about', 'NbioTek | About page.', 'About - Nbiotek');
  FAQS = new Route('/faqs', 'Nbiotek | FAQs', 'FAQs - Nbiotek');
  PRIVACY_POLICY = new Route(
    '/privacy-policy',
    'Nbiotek Privacy Policy',
    'Privacy Policy - Nbiotek'
  );

  DENIED = new Route('/denied', '', '');

  // Payment routes
  PAYMENTS = new Route('/payments', 'Payments', 'Payment Processing', [EnumRole.ALL]);
  PAYMENT_VERIFY = new Route('/payments/verify', 'Payment Verification', 'Verify Payment', [
    EnumRole.ALL
  ]);

  // auth
  REGISTER = new Route('/auth/register', 'NbioTek | Create Account', 'Create Account - Nbiotek');
  LOGIN = new Route('/auth/login', 'NbioTek | Login page', 'Login');
  OTP = new Route('/auth/otp', 'NbioTek | One Time Password (OTP)', 'One Time Password (OTP)');
  FORGOT_PWD = new Route('/auth/forgot-pwd', 'NbioTek | Forgot Password', 'Forgot password');
  PWD_RESET = new Route('/auth/pwd-reset', 'NbioTek | Password Reset', 'Password reset');

  PATIENT_REG_INFO = new Route('/auth/patient', 'NbioTek | Patient Info', 'Patient Info Reg.');

  // common
  NOTIFICATION = new Route('/notifications', 'Notification', 'Users Notification', [EnumRole.ALL]);
  SETTINGS = new Route('/settings', 'Settings', 'Users Settings', [EnumRole.ALL]);
  SUPPORT = new Route('/support', 'Support', 'Users Supports', [EnumRole.ALL]);

  // patient
  PATIENT = new Route('/patient', 'Dashboard', 'Patient Dashboard Page', [EnumRole.PATIENT]);
  PATIENT_INFO = new Route('/patient/info', 'Info', 'Patient Info Page', [EnumRole.PATIENT]);
  PATIENT_UPCOMING_APPOINTMENTS = new Route(
    '/patient/appointment/upcoming',
    'Upcoming',
    'Patient appointment upcoming page',
    [EnumRole.PATIENT]
  );
  PATIENT_BOOK_APPOINTMENTS = new Route(
    '/patient/appointment/booking',
    'Book',
    'Patient appointment booking page',
    [EnumRole.PATIENT]
  );
  PATIENT_PENDING_APPOINTMENTS = new Route(
    '/patient/appointment/pending',
    'Pending',
    'Patient appointment booking page',
    [EnumRole.PATIENT]
  );
  PATIENT_PAST_APPOINTMENTS = new Route(
    '/patient/appointment/past',
    'Past',
    'Patient appointment past page',
    [EnumRole.PATIENT]
  );
  PATIENT_TEST = new Route(
    '/patient/test',
    'Nbiotek | Test request',
    'Patient appointment past page',
    [EnumRole.PATIENT]
  );
  PATIENT_TEST_RESULT = new Route(
    '/patient/result',
    'Nbiotek | Test result',
    'Patient Test Result',
    [EnumRole.PATIENT]
  );
  PATIENT_AVAILABLE_TEST = new Route(
    '/patient/test/available',
    'Available',
    'Patient test available',
    [EnumRole.PATIENT]
  );
  PATIENT_PENDING_TEST = new Route(
    '/patient/test/pending',
    'Pending',
    'Patient test available page',
    [EnumRole.PATIENT]
  );
  PATIENT_BILLING = new Route(
    '/patient/billing',
    'Billing & Payments',
    'Patient Billing nad payment page',
    [EnumRole.PATIENT]
  );
  PATIENT_BILLING_TRANSACTION_HISTORY = new Route(
    '/patient/billing/history',
    'Transaction History',
    ' Transaction History Page',
    [EnumRole.PATIENT]
  );
  PATIENT_BILLING_PENDING_PAYMENTS = new Route(
    '/patient/billing/pending-payments',
    'Pending Payment',
    ' Pending Payment Page',
    [EnumRole.PATIENT]
  );
  PATIENT_BILLING_INSURANCE = new Route(
    '/patient/billing/insurance',
    'insurance',
    'Insurance Page',
    [EnumRole.PATIENT]
  );
  PATIENT_SUPPORT = new Route('/patient/support', 'Support & Help', 'Help  Desk Page', [
    EnumRole.PATIENT
  ]);
  PATIENT_SUPPORT_CONTACT = new Route('/patient/support/contact', 'Contact Us', 'Contact Us', [
    EnumRole.PATIENT
  ]);
  PATIENT_SUPPORT_FAQ = new Route('/patient/support/faq', 'FAQ', 'Frequent Asked Questions', [
    EnumRole.PATIENT
  ]);
  PATIENT_SETTINGS = new Route('/patient/settings', 'Settings', 'Settings Page', [
    EnumRole.PATIENT
  ]);
  PATIENT_SETTINGS_SETTINGS = new Route('/patient/settings/update', 'Settings', 'Settings Page', [
    EnumRole.PATIENT
  ]);
  PATIENT_SETTING_NOTIFICATION = new Route(
    '/patient/settings/NOTIFICATION',
    'Notification',
    'Notification Page',
    [EnumRole.PATIENT]
  );

  // Lab Tech
  LAB_TECH = new Route('/lab-tech', 'Dashboard', 'Lab Technician Dashboard page', [
    EnumRole.LAB_TECHNICIAN
  ]);
  LAB_TECH_TEST = new Route('/lab-tech/tests', 'Test Queue', 'Lab Technician All Test', [
    EnumRole.LAB_TECHNICIAN
  ]);
  LAB_TECH_TEST_DETAILS = new Route(
    '/lab-tech/tests/:id',
    'Test Details',
    'Lab Technician Single Test',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_QUALITY_CONTROL_PENDING = new Route(
    '/lab-tech/qc/pending',
    'Pending',
    'Lab Technician Quality Control Pending',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_QUALITY_CONTROL_HISTORY = new Route(
    '/lab-tech/qc/history',
    'History',
    'Lab Technician Quality Control',
    [EnumRole.LAB_TECHNICIAN]
  );

  LAB_TECH_QUALITY_CONTROL = new Route(
    '/lab-tech/qc',
    'Quality Control',
    'Lab Technician Quality Control',
    [EnumRole.LAB_TECHNICIAN]
  );

  LAB_TECH_QUALITY_CONTROL_DETAILS = new Route(
    '/lab-tech/qc/:id',
    'Test Results',
    'Lab Technician Single Test Result',
    [EnumRole.LAB_CORDINATOR]
  );

  LAB_TECH_RESULT_HISTORY = new Route(
    '/lab-tech/results',
    'Result History',
    'Lab Technician Tests Result',
    [EnumRole.LAB_TECHNICIAN]
  );

  LAB_TECH_RESULT_DETAIL = new Route(
    '/lab-tech/results/:id',
    'Result History',
    'Lab Technician Tests Result',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_TEST_TEMPLATES = new Route(
    '/lab-tech/test-templates',
    'Test Templates',
    'Lab Technician Test Templates',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_SUPPORT_CONTACT = new Route(
    '/lab-tech/sh/contact',
    'Contact',
    'Lab Technician contact',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_SUPPORT_FAQ = new Route('/lab-tech/sh/faq', 'FAQ', 'Lab Technician FAQs', [
    EnumRole.LAB_TECHNICIAN
  ]);
  LAB_TECH_SETTINGS = new Route('/lab-tech/settings', 'Settings', 'Lab Technician Settings', [
    EnumRole.LAB_TECHNICIAN
  ]);

  DOCTOR = new Route('/doctor', 'Dashboard', 'Doctor Dashboard page', [EnumRole.DOCTOR]);

  DOCTOR_APPOINTMENT = new Route('/doctor/appointments', 'Appointments', 'Doctor Dashboard page', [
    EnumRole.DOCTOR
  ]);
  DOCTOR_CREATE_APPOINTMENT = new Route(
    '/doctor/appointments/create',
    'Create Appointments',
    'Doctor Dashboard page',
    [EnumRole.DOCTOR]
  );

  DOCTOR_TEST_REVIEW = new Route('/doctor/review-test', 'Test Review', 'Doctor Patient List', [
    EnumRole.DOCTOR
  ]);

  DOCTOR_REFERRALS = new Route('/doctor/referrals', 'Referrals', 'Doctor Patient List', [
    EnumRole.DOCTOR
  ]);

  DOCTOR_HELP_SUPPORT = new Route(
    '/doctor/help_support',
    'Help & Support',
    'Doctor Help & Support',
    [EnumRole.DOCTOR]
  );

  DOCTOR_SETTINGS = new Route('/doctor/settings', 'Settings', 'Doctor Settings', [EnumRole.DOCTOR]);

  // LAB COORDINATOR
  LAB_COORD = new Route('/lab-coord', 'Dashboard', 'Lab Coordinator', [EnumRole.LAB_CORDINATOR]);
  LAB_COORD_TEST_SCHEDULING = new Route(
    '/lab-coord/tests',
    'Test Scheduling',
    'Lab Coordinator Test Scheduling',
    [EnumRole.LAB_CORDINATOR]
  );
  LAB_COORD_TEST_DETAILS = new Route(
    '/lab-coord/tests/:id',
    'Test Details',
    'Lab Coordinator Single Test',
    [EnumRole.LAB_CORDINATOR]
  );
  LAB_COORD_INVENTORY_MANAGEMENT = new Route(
    '/lab-coord/inventory',
    'Inventory Management',
    'Lab Coordinator Inventory Management',
    [EnumRole.LAB_CORDINATOR]
  );
  LAB_COORD_STAFF_SCHEDULES = new Route(
    '/lab-coord/staff',
    'Staff Schedules',
    'Lab Coordinator Staff Schedules',
    [EnumRole.LAB_CORDINATOR]
  );
  LAB_COORD_QUALITY_CONTROL = new Route(
    '/lab-coord/quality-control',
    'Quality Control',
    'Lab Coordinator Quality Control',
    [EnumRole.LAB_CORDINATOR]
  );
  LAB_COORD_QUALITY_CONTROL_DETAILS = new Route(
    '/lab-coord/quality-control/:id',
    'Test Results',
    'Lab Coordinator Single Test Result',
    [EnumRole.LAB_CORDINATOR]
  );
  LAB_COORD_NOTIFICATIONS = new Route(
    '/lab-coord/notifications',
    'Notifications',
    'Lab Coordinator Notifications',
    [EnumRole.LAB_CORDINATOR]
  );
  LAB_COORD_SUPPORT = new Route('/lab-coord/support', 'Help/Support', 'Lab Coordinator Support', [
    EnumRole.LAB_CORDINATOR
  ]);
  LAB_COORD_SETTINGS = new Route('/lab-coord/settings', 'Settings', 'Lab Coordinator Settings', [
    EnumRole.LAB_CORDINATOR
  ]);
  MARKETER = new Route('/marketer', 'Dashboard', 'Marketer Dashboard page', [EnumRole.MARKETER]);
  MARKETER_FIELD_VISIT = new Route(
    `/marketer/field-visits`,
    'Field Visit',
    'Marketer Field Visit',
    [EnumRole.MARKETER]
  );
  MARKETER_SETTINGS = new Route('/marketer/settings', 'Settings', 'Marketer Settings', [
    EnumRole.MARKETER
  ]);

  // receptionist
  RECPTS = new Route('/recpst', 'Dashboard', 'Receptionist Dashboard page', [
    EnumRole.RECEPTIONIST
  ]);

  RECPTS_PATIENT = new Route(
    '/recpst/patients',
    'Patients',
    'Receptionist Patient Registration page',
    [EnumRole.RECEPTIONIST]
  );

  RECPTS_PATIENT_DETAILS = new Route(
    '/recpst/patients/:id',
    'Patient Details',
    'Receptionist Patient Details page',
    [EnumRole.RECEPTIONIST]
  );

  RECPTS_APOINTMENT = new Route(
    '/recpst/appt',
    'Appointment',
    'Receptionist Appointment Booking page',
    [EnumRole.RECEPTIONIST]
  );

  RECPTS_BOOK_APOINTMENT = new Route(
    '/recpst/appt/book',
    'Appointment',
    'Receptionist Appointment Booking page',
    [EnumRole.RECEPTIONIST]
  );

  RECPTS_SUPPORT = new Route('/recpst/support', 'Help/Support', 'Receptionist Support', [
    EnumRole.RECEPTIONIST
  ]);

  RECPTS_SETTINGS = new Route('/recpst/settings', 'Settings', 'Receptionist Settings', [
    EnumRole.RECEPTIONIST
  ]);

  // SUPER ADVANCED_IMAGING
  SUPER_ADMIN = new Route('/admin', 'Dashboard', 'Super Admin dashboard', [EnumRole.SUPER_ADMIN]);
  SUPER_ADMIN_USER_MANAGEMENT = new Route(
    '/admin/user-management',
    'User',
    'Super Admin user management',
    [EnumRole.SUPER_ADMIN]
  );
  SUPER_ADMIN_PATIENT_MANAGEMENT = new Route(
    '/admin/patient-management',
    'Patients',
    'Super Admin patient management',
    [EnumRole.SUPER_ADMIN]
  );
  SUPER_ADMIN_CONTENT_MANAGEMENT = new Route(
    '/admin/content-management',
    'Content',
    'Super Admin Content management',
    [EnumRole.SUPER_ADMIN]
  );
  SUPER_ADMIN_SETTINGS = new Route('/admin/settings', 'Settings', 'Admin Settings', [
    EnumRole.SUPER_ADMIN
  ]);

  getRedirectPathByRole(_role: EnumRole) {
    switch (_role) {
      case EnumRole.LAB_TECHNICIAN:
        return this.LAB_TECH.path;
      case EnumRole.PATIENT:
        return this.PATIENT.path;
      case EnumRole.LAB_CORDINATOR:
        return this.LAB_COORD.path;
      case EnumRole.DOCTOR:
        return this.DOCTOR.path;
      case EnumRole.MARKETER:
        return this.MARKETER.path;
      case EnumRole.RECEPTIONIST:
        return this.RECPTS.path;
      case EnumRole.SUPER_ADMIN:
        return this.SUPER_ADMIN.path;
      // TODO: Add more modules authorization routing here.
      default:
        return '';
    }
  }

  isPublicPath(path: string): boolean {
    const publicPaths = [
      this.HOME.path,
      this.LAB_TEST.path,
      this.SPECIAL_PACKAGES.path,
      this.ADVANCED_IMAGING.path,
      this.MOLECULAR_DIAGNOSTICS.path,
      this.BIO_HUB.path,
      this.CONTACT_US.path,
      this.ECOMMERCE.path,
      this.WHATS_NEW.path,
      this.ABOUT.path,
      this.FAQS.path,
      this.PRIVACY_POLICY.path,
      this.REGISTER.path,
      this.LOGIN.path,
      this.OTP.path,
      this.FORGOT_PWD.path,
      this.PWD_RESET.path,
      this.DENIED.path,
      this.PAYMENTS.path,
      this.PAYMENT_VERIFY.path
    ];

    return publicPaths.includes(path) || path.startsWith('/auth');
  }

  getAllProtectedRoutes() {
    const routes = new Map<string, Array<string>>();

    const properties = Object.getOwnPropertyNames(this);

    for (const prop of properties) {
      const value = this[prop as keyof Routes];
      if (value instanceof Route && (value.roles.length == 0 || value.roles.length > 0)) {
        if (!this.isPublicPath(value.path)) {
          routes.set(value.path, value.roles);
        }
      }
    }

    return routes;
  }
}

const ROUTES = new Routes();

export const roleAccessRules = {
  '/patient': [EnumRole.PATIENT],
  '/lab-tech': [EnumRole.LAB_TECHNICIAN],
  '/lab-coord': [EnumRole.LAB_CORDINATOR],
  '/doctor': [EnumRole.DOCTOR],
  '/marketer': [EnumRole.MARKETER],
  [ROUTES.RECPTS.path]: [EnumRole.RECEPTIONIST],
  [ROUTES.SUPER_ADMIN.path]: [EnumRole.SUPER_ADMIN]
};

export default ROUTES;
