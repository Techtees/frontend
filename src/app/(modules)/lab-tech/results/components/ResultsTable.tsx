import { Archive, ArchiveRestore, EllipsisVertical, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Status from '@/atoms/Buttons/Status';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { formatTestDate } from '@/utils/date';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import Pagination from '@/atoms/pagination';
import { EnumLabTechQueryType } from '@/store/LabTechStore';
import { observer } from 'mobx-react-lite';

interface IQCTableProps {
  type: 'recent' | 'archived';
  isLoading: boolean;
  resultsData: TRecentTestResults;
}

const ResultsTable = ({ type, isLoading, resultsData }: IQCTableProps) => {
  const dataType =
    type === 'archived' ? EnumLabTechQueryType.ARCHIVED : EnumLabTechQueryType.RESULT;
  const pagination = resultsData.pagination;
  const router = useRouter();
  const {
    LabTechStore: { queries, setLimit, setPage }
  } = useStore();
  const query = type === 'archived' ? queries.ARCHIVED : queries.RESULT;

  const handleSetLimit = (_limit: number) => setLimit(_limit, dataType);
  const handleSetPage = (_page: number) => setPage(_page, dataType);

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full overflow-clip rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Id</TableHead>
              <TableHead>Serial No.</TableHead>
              <TableHead>Test type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Result Status</TableHead>
              <TableHead>QC Status</TableHead>
              <TableHead className="w-[20px]"></TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableLoader rows={20} columns={9} />
          ) : (
            resultsData.results.length !== 0 && (
              <TableBody>
                {resultsData.results.map((resultDatum) => (
                  <TableRow key={resultDatum.id}>
                    <TableCell>{resultDatum?.testId ?? '-'}</TableCell>
                    <TableCell className="font-medium">
                      {resultDatum?.testSerialNo ?? '-'}
                    </TableCell>
                    <TableCell>
                      <Status variant={resultDatum.testType} />
                    </TableCell>
                    <TableCell>
                      <Status variant={resultDatum.priority} />
                    </TableCell>
                    <TableCell>{formatTestDate(resultDatum.completedAt)}</TableCell>
                    <TableCell>
                      <Status variant={resultDatum.status} />
                    </TableCell>
                    <TableCell>{formatTestDate(resultDatum.deadlineAt)}</TableCell>
                    <TableCell>
                      <Status variant={resultDatum.resultStatus} />
                    </TableCell>
                    <TableCell>
                      {resultDatum?.qcStatus && <Status variant={resultDatum.qcStatus} />}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-fit">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `${ROUTES.LAB_TECH_RESULT_DETAIL.path.replaceAll(':id', resultDatum.id)}`
                              )
                            }
                          >
                            <Eye />
                            <p>View Result</p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )
          )}
        </Table>

        {isLoading || (resultsData.results.length === 0 && <EmptyState title="No Test data" />)}
      </div>

      {isLoading || (
        <Pagination
          limit={pagination.limit ?? query.limit}
          setLimit={handleSetLimit}
          currentPage={pagination.page ?? query.page}
          setPage={handleSetPage}
          total={pagination.total}
          totalPages={pagination.totalPages}
          siblingCount={1}
        />
      )}
    </div>
  );
};

export default observer(ResultsTable);
