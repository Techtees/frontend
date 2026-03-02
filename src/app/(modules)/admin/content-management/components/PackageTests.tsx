'use client';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useFetchPackageTest } from '@/hooks/admin/useFetchPackageTest';
import TestCard from './TestCard';
import EmptyState from '@/components/EmptyState';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { PlusIcon } from 'lucide-react';
import { pagination } from '@/constants/data';
import Pagination from '@/atoms/pagination';

const PackageTests = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [testStatus, setTestStatus] = useState('ACTIVE');
  const [data, setData] = useState<Array<TAdminTestItemBase>>([]);
  const [dataPagination, setDataPagination] = useState<TPaginationResponse>(pagination);
  const {
    data: packageTests,
    status,
    isLoading
  } = useFetchPackageTest({ limit, page, status: testStatus });
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  useEffect(() => {
    if (!isLoading && packageTests !== undefined) {
      setData(packageTests.packages);
      setDataPagination(packageTests.pagination);
    }
  }, [isLoading, packageTests]);

  return (
    <div className="flex h-[80vh] w-full flex-col space-y-4 overflow-y-scroll">
      <div className="flex justify-end">
        <Button
          className="w-fit bg-blue-400"
          onClick={() =>
            toggleModals({ name: AppModals.ADMIN_PACKAGE_TEST, open: true, testId: '' })
          }
        >
          <PlusIcon /> package
        </Button>
      </div>

      {status === 'pending' &&
        Array(10)
          .fill(1)
          .map((_, id) => <Skeleton key={id} className="h-96 w-full" />)}

      {status === 'success' && (
        <Select value={testStatus} onValueChange={setTestStatus}>
          <SelectTrigger className="w-fit rounded-lg" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="ACTIVE" className="rounded-lg">
              Active
            </SelectItem>
            <SelectItem value="INACTIVE" className="rounded-lg">
              Inactive
            </SelectItem>
          </SelectContent>
        </Select>
      )}
      {status === 'success' && data.map((datum) => <TestCard key={datum.id} {...{ datum }} />)}

      {status === 'success' && (
        <Pagination
          limit={limit ?? Number(dataPagination.limit)}
          setLimit={setLimit}
          currentPage={page ?? Number(dataPagination.page)}
          setPage={setPage}
          total={30}
          totalPages={dataPagination.totalPages}
          siblingCount={1}
        />
      )}

      {status === 'success' && data && data.length == 0 && (
        <div className="h-3/4 w-full rounded-lg bg-white">
          <EmptyState title="No Package Tests." />
        </div>
      )}
    </div>
  );
};

export default PackageTests;
