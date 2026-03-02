'use client';
import EmptyState from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useFetchSingleTest } from '@/hooks/admin/useFetchSingleTest';
import TestCard from './TestCard';
import { useEffect, useState } from 'react';
import { pagination } from '@/constants/data';
import Pagination from '@/atoms/pagination';
import InputSearch from '@/atoms/fields/InputSearch';
import { useDebounce } from '@/hooks/useDebounce';

const SingleTests = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [testStatus, setTestStatus] = useState('ACTIVE');
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchInput = useDebounce(searchInput, 500);
  const [data, setData] = useState<Array<TAdminTestItemBase>>([]);
  const [dataPagination, setDataPagination] = useState<TPaginationResponse>(pagination);
  const {
    data: singleTests,
    status,
    isLoading
  } = useFetchSingleTest({
    limit,
    page,
    status: testStatus,
    search: debouncedSearchInput || undefined
  });

  useEffect(() => {
    if (!isLoading && singleTests !== undefined) {
      setData(singleTests.requests);
      setDataPagination(singleTests.pagination);
    }
  }, [isLoading, singleTests]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchInput, testStatus]);

  return (
    <div className="flex h-dvh w-full flex-col space-y-4 overflow-y-scroll py-8">
      {status === 'pending' &&
        Array(10)
          .fill(1)
          .map((_, id) => <Skeleton key={id} className="h-96 w-full" />)}

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputSearch
          placeholder="Search tests..."
          className="w-full sm:max-w-md"
          onSearch={setSearchInput}
          disabled={status === 'pending'}
        />
        <Select value={testStatus} onValueChange={setTestStatus} disabled={status === 'pending'}>
          <SelectTrigger className="w-fit rounded-lg" aria-label="Select a value">
            <SelectValue placeholder="Status" />
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
      </div>
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
          <EmptyState title="No Individual test." />
        </div>
      )}
    </div>
  );
};

export default SingleTests;
