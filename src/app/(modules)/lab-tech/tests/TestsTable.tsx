'use client';
import { EllipsisVertical, Eye, Pause, Play, Upload } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Status, { EnumTestStatus } from '@/atoms/Buttons/Status';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { observer } from 'mobx-react-lite';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useUpdateTestStatus } from '@/hooks/labTech/useUpdateTestStatus';
import { formatTestDate } from '@/utils/date';
import Pagination from '@/atoms/pagination';
import { EnumLabTechQueryType } from '@/store/LabTechStore';

interface ITestTableProps {
  isLoading: boolean;
  tests: TTestQuesRes;
}

const TestsTable = ({ isLoading, tests }: ITestTableProps) => {
  const pagination = tests.pagination;
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals },
    LabTechStore: { queries, setLimit, setPage }
  } = useStore();
  const { mutateTestStatus, isPending } = useUpdateTestStatus();

  const handleSetLimit = (_limit: number) => setLimit(_limit, EnumLabTechQueryType.TEST);
  const handleSetPage = (_page: number) => setPage(_page, EnumLabTechQueryType.TEST);

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full overflow-clip rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Id</TableHead>
              <TableHead>Serial No.</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date created</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[20px]"></TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableLoader rows={20} columns={8} />
          ) : (
            tests.requests.length !== 0 && (
              <TableBody>
                {tests.requests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell>{test?.testId ?? '-'}</TableCell>
                    <TableCell className="whitespace-nowrap font-medium">
                      {test?.testSerialNo ?? '-'}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{test.testName}</TableCell>
                    <TableCell>
                      <Status variant={test.priority} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatTestDate(test.createdAt)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatTestDate(test.preferredAt)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatTestDate(test.deadlineAt)}
                    </TableCell>
                    <TableCell>
                      <Status variant={test.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `${ROUTES.LAB_TECH_TEST_DETAILS.path.replaceAll(':id', test.id)}`
                                )
                              }
                            >
                              <Eye />
                              <p>View Test</p>
                            </DropdownMenuItem>

                            {test.status === EnumTestStatus.PENDING && (
                              <DropdownMenuItem
                                disabled={isPending}
                                onClick={() =>
                                  mutateTestStatus({
                                    id: test.id,
                                    payload: { status: EnumTestStatus.IN_PROGRESS }
                                  })
                                }
                              >
                                <Play />
                                <p>Start test</p>
                              </DropdownMenuItem>
                            )}

                            {test.status === EnumTestStatus.IN_PROGRESS && (
                              <DropdownMenuItem
                                disabled={isPending}
                                onClick={() =>
                                  mutateTestStatus({
                                    id: test.id,
                                    payload: { status: EnumTestStatus.PENDING }
                                  })
                                }
                              >
                                <Pause />
                                <p>Pause test</p>
                              </DropdownMenuItem>
                            )}

                            {test.status === EnumTestStatus.IN_PROGRESS && (
                              <DropdownMenuItem
                                onClick={() => {
                                  toggleModals({
                                    open: true,
                                    name: AppModals.RESULT_UPLOAD_MODAL,
                                    testId: test.id,
                                    originalTestId: test.originalTestId || test.testId
                                  });
                                }}
                              >
                                <Upload />
                                <p>Upload result</p>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )
          )}
        </Table>

        {isLoading || (tests.requests.length === 0 && <EmptyState title="No Test data" />)}
      </div>

      {isLoading || (
        <Pagination
          limit={pagination.limit ?? queries.TEST.limit}
          setLimit={handleSetLimit}
          currentPage={pagination.page ?? queries.TEST.page}
          setPage={handleSetPage}
          total={pagination.total}
          totalPages={pagination.totalPages}
          siblingCount={1}
        />
      )}
    </div>
  );
};

export default observer(TestsTable);
