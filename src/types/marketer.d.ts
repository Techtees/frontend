interface TMarketerDashboard {
  totalSamplesCollected: number;
  totalAssignedTasks: number;
  totalUploadedSamples: number;
  referralActivity: {
    total: number;
    accepted: number;
    acceptanceRate: number;
  };
}

interface TFieldOfficerAnalytics {
  totalSamplesCollected: number;
  totalAssignedTask: number;
  totaluploadedSample: number;
}
interface TFieldOfficerDashboard {
  data: TFieldOfficerAnalytics;
}
interface TFieldTestRequest {
  id: string;
  testId: string;
  patientName: string;
  testName: string;
  testDescription: string;
  testType: string;
  notes: string;
  location: {
    type: string;
    address: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  availableDate: string;
}

interface TFieldTestRespones {
  data: {
    requests: FieldTestRequest[];
    pagination: Pagination;
  };
  message: string;
  statusCode: number;
  pagination: Pagination;
}

interface TLogSample {
  testName: string;
  sampleType: string;
  requiredAmount: string;
  collectionStatus: boolean;
}

interface TRemoteFile {
  bucket: string;
  file: string;
  mime_type: string;
  uuid: string;
}

interface TSampleCollectionData {
  logSamples: TLogSample[];
  media: { file: TRemoteFile }[];
  collectionNotes: string;
}

interface Person {
  id: string;
  name: string;
}

interface TestInfo {
  id: string;
  name: string;
  description?: string;
}
interface testPhotos {
  id: string;
  url: string;
  format: string;
  file_name: string;
}
interface testSamples {
  testName: string;
  sampleType: string;
  requiredAmount: string;
  collectionStatus: boolean;
}

interface FieldTaskData {
  id: string;
  patient: Person;
  technician: Person;
  test: TestInfo;

  logSamples: testSamples[];
  samplePhotos: testPhotos[];
  notes: string;
  package: any | null;
  dateDue: string;
  collectionDate: string;
  requestAt: string;
  createdAt: string;
}

interface TFieldTaskShowResponse {
  data: FieldTaskData;
  message: string;
  statusCode: number;
}
