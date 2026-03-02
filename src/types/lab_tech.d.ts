type TLabTechDashboardRes = {
  totalPendingTests: number;
  totalCompletedTests: number;
  averageTurnaroundTime: number;
  totalMessages: number;
  recentTests: [];
};

type TTestType = {
  id: number;
  patientName: string;
  testType: string;
  requestDate: string;
  deadline: string;
  priority: string;
};

// =========== Tests ===============
type TTestData = {
  id: string;
  testId?: string;
  testSerialNo?: string;
  patientName: string;
  testName: string;
  testType: string;
  type: string;
  status: string;
  priority: string;
  preferredAt: string;
  deadlineAt: string;
  completedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  resultStatus: string;
  originalTestId?: string;
  technician: {
    id: string;
    name: string;
  } | null;
  qcStatus?: string;
  location: {
    type: string;
    address: string;
  };
  marketer: {
    id: string;
    name: string;
  } | null;
  doctor: {
    id: string;
    name: string;
  } | null;
  wantDoctorRecommendation: 'no' | 'yes';
};

type TTestQuesRes = INBTPaginatedData<TTestData>;

type TTestDetailsPatient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  age: number;
};

type TTestResultData = {
  parameter: string;
  result: string;
  range: string;
  unit: string;
  reference: string;
};

type TMarketerSampleMedia = {
  id: string;
  file_name: string;
  url: string;
  secure_url: string;
  format: string;
};

type TMarketerLogSamples = {
  id: string;
  testName: string;
  sampleType: string;
  requiredAmount: string;
  collectionStatus: boolean;
  createdAt: string;
  updatedAt: string;
};

type TSingleTestDetail = {
  id: string;
  patient: {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    age: number;
  };
  test: {
    id: string;
    name: string;
    category: string;
    description: string;
  };
  package?: string;
  type: string;
  status: string;
  priority: string;
  preferredAt: string;
  deadlineAt: string;
  completedAt?: string;
  notes?: string;
  technician?: {
    id: string;
    name: string;
  };
  marketer?: {
    id: string;
    name: string;
  };
  wantDoctorRecommendation: 'no' | 'yes';
  collectionNotes: string;
  doctor?: {
    id: string;
    name: string;
  };
  location: {
    type: string;
    address: string;
  };
  logSamples?: Array<TMarketerLogSamples>;
  samplePhotos?: Array<TMarketerSampleMedia>;
  qcStatus?: string;
  qcReason?: string;
  results?: Array<TTestResultData>;
  media: Array<IMediaResp>;
  resultLink: string;
  createdAt: string;
  updatedAt: string;
};

// ============ Results ========================
type TTestQuery = {
  search: string;
  status: string;
  fromDate: string;
  toDate: string;
  sortBy: string;
  sortOrder: string;
  priority: string;
} & TGeneralPaginatedQuery;

type TRecentTestResults = {
  results: Array<TTestData>;
  pagination: TPaginationResponse;
};

type TAvailabiltyData = {
  id: string;
  status: string;
  lastUpdate: string;
};

type TTestTemplateParameter = {
  id: string;
  templateId: string;
  name: string;
  measurementUnit: string;
  referenceRange: string;
  createdAt: string;
  updatedAt: string;
};

type TTestTemplateItem = {
  id: string;
  testId: string;
  testName: string;
  createdAt: string;
  updatedAt: string;
  parameters: TTestTemplateParameter[];
};

type TTestTemplatesResp = TTestTemplateItem[];
