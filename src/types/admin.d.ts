type TAdminUsersItem = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TAdminUsersResp = {
  formatted: Array<TAdminUsersItem>;
  pagination: TPaginationResponse;
};

type TAdminDashboardStats = {
  totalUsers: number;
  totalPackages: number;
  totalLabTestRequests: number;
  totalTestResults: number;
  superAdmin: number;
  doctor: number;
  referralDoctor: number;
  patient: number;
  labCoordinator: number;
  labTechnician: number;
  receptionist: number;
  marketer: number;
  technicalCoordinator: number;
  totalAppointments: number;
  totalRevenue: string;
};

type TAdminTestItemBase = {
  id: string;
  name: string;
  description: string;
  price: number;
  requirements: Array<string>;
  category: string;
  discountedPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TAdminTestItem = TAdminTestItemBase & {
  tests?: Array<TAdminTestItemBase>;
};

type TAdminTestTemplateParameter = {
  name: string;
  measurement_unit?: string;
  reference_range?: string;
  measurementUnit?: string;
  referenceRange?: string;
};

type TAdminTestTemplateItem = {
  id?: string;
  testId: string;
  testName?: string;
  test?: { id: string; name: string };
  parameters: Array<TAdminTestTemplateParameter>;
  createdAt?: string;
  updatedAt?: string;
};

type TAdminTestTemplateResp = {
  templates: Array<TAdminTestTemplateItem>;
  pagination?: TPaginationResponse;
};

type TAdminTestTemplatePayload = {
  testId: string;
  parameters: Array<TAdminTestTemplateParameter>;
};

type TChartQuery = {
  period: string;
};

type TAdminChartRes = {
  data: Array<{
    date: string;
    total: number;
  }>;
};

type TAdminCarouselItem = {
  id: string;
  title: string;
  description: string;
  linkTitle: string;
  linkStyle: string;
  link: string;
  media: Array<{
    file_url: string;
    mime_type: string;
    bucket: string;
    uuid: string;
  }>;
};

type TAdminHeroSection = {
  id: string;
  heading: string;
  tagline: string;
  carousel: Array<TAdminCarouselItem>;
};

type TAdminTestimonialAuthor = {
  fullName: string;
  role: string;
  media: Array<{
    file_url: string;
    mime_type: string;
    bucket: string;
    uuid: string;
  }>;
};

type TAdminTestimonial = {
  id: string;
  description: string;
  author: TAdminTestimonialAuthor;
  rating: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TAdminTestimonialResp = {
  testimonials: Array<TAdminTestimonial>;
  pagination: TPaginationResponse;
};

type TAdminPartnerItem = {
  id: string;
  media: Array<{
    file_url: string;
    mime_type: string;
    bucket: string;
    uuid: string;
  }>;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TAdminPartnerResp = {
  partners: Array<TAdminPartnerItem>;
  pagination: TPaginationResponse;
};

type TAdminDoctorFeeItem = {
  id: string;
  feature: string;
  value: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TAdminDoctorsFeeResp = {
  features: Array<TAdminDoctorFeeItem>;
  pagination: TPaginationResponse;
};

type TAdminTestQuery = TGeneralPaginatedQuery & {
  status: string;
  search?: string;
};

type TAdminPatientQuery = TGeneralPaginatedQuery & {
  search?: string;
  status?: string;
};

type TAdminPatientItem = {
  id: string;
  patientSerialNo: string;
  email: string | null;
  isProfileCompleted: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profileStatus: string;
  role: string;
  patientPersonal: {
    id: string;
    maritalStatus: string | null;
    gender: string;
    dateOfBirth: string;
    weight: string | null;
    height: string | null;
    primaryCarePhysician: string | null;
  } | null;
  appointments: Array<any>;
};

type TAdminPatientsResp = {
  patients: Array<TAdminPatientItem>;
  pagination: TPaginationResponse;
};
