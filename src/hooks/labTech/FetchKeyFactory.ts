import { LAB_TECH, TEST } from '@/constants/api';
import { QUERY_KEY } from '@/constants/data';

export const labTech = {
  getDashboard() {
    return {
      path: LAB_TECH.DASHBOARD,
      keys: () => [QUERY_KEY.LAB_DASHBOARD, LAB_TECH.DASHBOARD] as const
    };
  },

  getTestQueue(query: Partial<TTestQuery>) {
    return {
      path: TEST.ASSIGNED_TESTS,
      keys: () =>
        [QUERY_KEY.LAB_DASHBOARD, LAB_TECH.DASHBOARD, TEST.ASSIGNED_TESTS, query] as const,
      params: query
    };
  },

  getTestByID(id: string) {
    return {
      path: TEST.SINGLE_ASSIGNED_TESTS.replace(':id', id),
      keys: () =>
        [
          QUERY_KEY.LAB_DASHBOARD,
          LAB_TECH.DASHBOARD,
          TEST.ASSIGNED_TESTS,
          TEST.SINGLE_ASSIGNED_TESTS,
          id
        ] as const
    };
  },

  getTestTemplates() {
    return {
      path: LAB_TECH.TEST_TEMPLATES,
      keys: () => [QUERY_KEY.LAB_DASHBOARD, LAB_TECH.TEST_TEMPLATES] as const
    };
  }
};
