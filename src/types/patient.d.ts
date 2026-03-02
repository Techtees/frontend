// profile interface
interface PersonalInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  maritalStatus: string;
  gender: string;
  dateOfBirth: string;
  weight: string;
  height: string;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
}

interface EmergencyContact {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

interface ContactInfo {
  homeAddress: string;
  city: string;
  state: string;
  landMark: string;
  zipCode: string;
  emergencyContact: EmergencyContact;
}

interface PolicyHolder {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface InsuranceInfo {
  primaryInsuranceProvider: string;
  insurancePlanName: string;
  policyNumber: string;
  groupNumber: string;
  insurancePhoneNumber: string;
  policyHolder: PolicyHolder;
}

interface Data {
  personal: PersonalInfo;
  contact: ContactInfo;
  insurance: InsuranceInfo;
}

interface InfoApiResponse {
  data: Data;
  message: string;
  statusCode: number;
}

// Booking Interface

interface BookingSummaryProps {
  bookingData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    appointmentDate: Date;
    selectedTests: Array<{
      name: string;
      price: number;
    }>;
    location: {
      type: 'Lab' | 'Custom';
      address: string;
    };
  };
  onEdit: () => void;
  onConfirm: () => void;
}

interface BookingForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: {
    type: LocationType;
    address: string;
  };
  availableDate: Date;
  paymentMethod: 'via_card' | 'location';
  wantDoctorRecommendation: 'yes' | 'no';

  testRequests: Array<{
    testId: string;
    entityType: string;
  }>;
}

interface Appointment {
  id: string;
  totalAmount: number;
  data: {
    paymentLink: string;
  };
}

interface TverifyPayment {
  tx_Ref: string;
}

interface TverifyPaymentResponse {
  data: {
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
    paymentId: string;
    transactionId: string;
    amount: number;
    status: string;
  };
  message: string;
  statusCode: number;
}

interface BookAppointmentDTO {
  fullName: string;
  email?: string;
  phoneNumber: string;
  availableDate: Date | undefined | string;
  phoneNumber: string;
  location: {
    type: LocationType;
    address: string;
  };

  testRequests: Array<{
    testId: string;
    entityType: string;
  }>;
  paymentMethod: string;
}

interface TPatientDashboard {
  totalAppointments: number;
  totalTestResults: number;
  totalMessages: number;
  upcomingAppointment: number;
  recentAppointments: Array<{
    id: string;
    location: {
      type: LocationType;
      address: string;
    };
    appointmentDate: string;
  }>;
}

interface TPatientRecentTest {
  data: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    testResultId: string;
    date: string | Date | unefined;
    resultStatus: string;
  }>;
}

interface AppointmentItem {
  id: string;
  title: string;
  description: string;
  tests: Array<{
    name: string;
    description: string;
    type: string;
    status: string;
  }>;
  patientName: string;
  location: {
    type: string;
    address: string;
  };
  appointmentDate: string;
  status: string;
  paymentStatus: string;
  totalAmount?: number;
}

interface UpcomingAppointment {
  data: {
    upcomingAppointments: AppointmentItem[];
  };
}

interface PendingAppointment {
  data: {
    pendingAppointments: AppointmentItem[];
  };
}

interface PastAppointment {
  data: {
    pastAppointments: AppointmentItem[];
  };
}

type AppointmentItemProps =
  | { type: 'upcoming'; data?: { upcomingAppointments: AppointmentItem[] } }
  | { type: 'pending'; data?: { pendingAppointments: AppointmentItem[] } }
  | { type: 'past'; data?: { pastAppointments: AppointmentItem[] } };

interface;

interface TShowAppointment {
  data: AppointmentItem;
}

// Test Result Interface

interface Patient {
  name: string;
  id: string;
}

interface Technician {
  name: string;
  id: string;
}

interface TestResult {
  parameter: string | null;
  result: string | null;
  unit: string;
  range: string | null;
  reference: string | null;
}

interface TestReqDet {
  name: string;
  category: string;
  description: string;
}

interface Test {
  id: string;
  testId: string;
  testName: string;
  type: string;
  test?: TestReqDet;
  createdAt: string;
  conductedAt: string;
  status: string;
  resultStatus: string;
  patient: Patient;
  technician: Technician;
  results: TestResult[];
  testSuitId: string;
  resultLink: string;
  testResultId: string;
  media?: Array<IMediaResp>;
  samplePhotos?: Array<{
    id: string;
    file_name: string | null;
    url: string;
    secure_url: string;
    format: string;
  }>;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface TestResultsData {
  results: Test[];
  pagination: Pagination;
}

interface TestResultResponse {
  data: TestResultsData;
  message?: string;
  statusCode?: number;
}

// test result details

interface TestSuiteSingle {
  id: string;
  testId: string;
  name: string;
  results: TestResult[];
}

interface TestSuiteDetails {
  data: {
    id: string;
    title: string;
    description: string;
    patientName: string;
    appointmentDate: string;
    doctor: {} | null;
    tests: TestSuiteSingle[];
    resultLink: string;
    media?: Array<IMediaResp>;
    samplePhotos?: Array<{
      id: string;
      file_name: string | null;
      url: string;
      secure_url: string;
      format: string;
    }>;
  };
}

interface TestResultDetailsResponse {
  data: Test;
  message: string;
  statusCode: number;
}

// Payment Interface
interface Payment {
  invoiceNo: string;
  paymentMethod: string;
  paymentDate: string;
  amountPaid: number;
  paymentStatus: string;
  paymentReceiptLink: string;
}

interface BillingHistory {
  data: {
    payments: Payment[];
    pagination: Pagination;
  };
}

// FAQ
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'appointments' | 'results' | 'billing' | 'account';
  isPopular?: boolean;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string; // Path to icon or component name
  description: string;
}
