import { EllipsisVertical, Eye, FlaskConical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Status, { EnumResultStatus } from '@/atoms/Buttons/Status';
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
import { EnumLabTechQueryType } from '@/store/LabTechStore';
import Pagination from '@/atoms/pagination';
import { observer } from 'mobx-react-lite';

interface IQCTableProps {
  type: 'history' | 'pending';
  isLoading: boolean;
  resultsData: TQCTestResp;
}

const QCTable = ({ type, isLoading, resultsData }: IQCTableProps) => {
  const pagination = resultsData.pagination;
  const dataType =
    type === 'history'
      ? EnumLabTechQueryType.CONTROL_HISTORY
      : EnumLabTechQueryType.CONTROL_PENDING;

  const router = useRouter();
  const {
    LabTechStore: { queries, setLimit, setPage }
  } = useStore();
  const query = type === 'history' ? queries.CONTROL_HISTORY : queries.CONTROL_PENDING;

  const handleSetLimit = (_limit: number) => setLimit(_limit, dataType);
  const handleSetPage = (_page: number) => setPage(_page, dataType);

  return (
    <div className="flex w-full flex-col space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Test Id</TableHead>
            <TableHead>Serial No.</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>Test type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="">Doctor&apos;s recs</TableHead>
            <TableHead className="">Assigned doctor</TableHead>
            <TableHead>Appointment Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>QC status</TableHead>
            <TableHead>Date submitted</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={12} />
        ) : (
          resultsData.requests.length !== 0 && (
            <TableBody>
              {resultsData.requests.map((qcDatum) => (
                <TableRow key={qcDatum.id}>
                  <TableCell>{qcDatum?.testId ?? '-'}</TableCell>
                  <TableCell>{qcDatum?.testSerialNo ?? '-'}</TableCell>
                  <TableCell>{qcDatum.testName}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.testType} />
                  </TableCell>
                  <TableCell>
                    <Status variant={qcDatum.priority} />
                  </TableCell>
                  <TableCell>
                    <Status variant={qcDatum.wantDoctorRecommendation} />
                  </TableCell>
                  <TableCell>{qcDatum.doctor ? qcDatum.doctor.name : 'Nil'}</TableCell>
                  <TableCell>{formatTestDate(qcDatum.preferredAt)}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.status} />
                  </TableCell>
                  <TableCell>{formatTestDate(qcDatum.deadlineAt)}</TableCell>
                  <TableCell>
                    {qcDatum?.qcStatus && <Status variant={qcDatum.qcStatus} />}
                  </TableCell>
                  <TableCell>{formatTestDate(qcDatum.completedAt)}</TableCell>
                  <TableCell>
                    <Status variant={qcDatum.resultStatus} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `${ROUTES.LAB_TECH_QUALITY_CONTROL_DETAILS.path.replaceAll(':id', qcDatum.id)}`
                            )
                          }
                        >
                          <Eye />
                          <p>View Test</p>
                        </DropdownMenuItem>
                        {qcDatum.resultStatus == EnumResultStatus.PENDING.toString() && (
                          <DropdownMenuItem onClick={() => {}}>
                            <FlaskConical />
                            <p>Request Control</p>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )
        )}
      </Table>

      {isLoading || (resultsData.requests.length === 0 && <EmptyState title="No Test data" />)}

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

export default observer(QCTable);
