type SingleTest = {
  id: string;
  name: string;
  description: string;
  price: number;
  requirements?: string[];
  category: string;
  discountedPrice?: number;
  type?: string;
};

type PackageTest = {
  id: string;
  name: string;
  description: string;
  price: number;
  requirements?: string[];
  category?: string;
  discountedPrice?: number;
  tests: SingleTest[];
  type?: string;
};

type AllTestResponse = {
  data: {
    requests: SingleTest[];
    pagination: {
      total: number;
      limit: number;
      pages: number;
      totalPages: number;
    };
  };
};

type AllPackageTestResponse = {
  data: PackageTest[];
  pagination: {
    total: number;
    limit: number;
    pages: number;
    totalPages: number;
  };
};

interface TestQueryParams {
  type?: 'SINGLE' | 'PACKAGE';
  category?: 'MOLECULAR' | 'ADVANCED_IMAGING';
  page?: number;
  limit?: number;
  search?: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

interface PaginatedResponse<T> {
  data: {
    requests: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      total?: number;
      limit: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}
