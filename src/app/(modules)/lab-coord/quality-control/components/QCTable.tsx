import {
  BriefcaseMedicalIcon,
  EllipsisVertical,
  Eye,
  HandCoins,
  Pause,
  Play,
  Shield
} from 'lucide-react';
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
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import TableLoader from '@/atoms/Loaders/TableLoader';
import EmptyState from '@/components/EmptyState';
import { formatTestDate } from '@/utils/date';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useUpdateQCStatus } from '@/hooks/labCoord/useUpdateQCStatus';

interface IQCTableProps {
  isLoading: boolean;
  resultsData: TQCTestResp;
}

const QCTable = ({ isLoading, resultsData }: IQCTableProps) => {
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  const { mutate: qcStatusMutate } = useUpdateQCStatus();

  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Test Id</TableHead>
            <TableHead>Serial No.</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Test Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="">Doctor&apos;s recs</TableHead>
            <TableHead className="">Assigned doctor</TableHead>
            <TableHead>Appointment Date</TableHead>
            <TableHead className="w-[80px]">Result</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="w-[80px]">QC</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={12} />
        ) : (
          resultsData.requests.length !== 0 && (
            <TableBody>
              {resultsData.requests.map((qcDatum) => {
                return (
                  <TableRow key={qcDatum.id}>
                    <TableCell>{qcDatum?.testId ?? '-'}</TableCell>
                    <TableCell>{qcDatum?.testSerialNo ?? '-'}</TableCell>
                    <TableCell>{qcDatum.testName}</TableCell>
                    <TableCell>
                      <Status variant={qcDatum.status} />
                    </TableCell>
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
                      <Status variant={qcDatum.resultStatus} />
                    </TableCell>
                    <TableCell>{formatTestDate(qcDatum.deadlineAt)}</TableCell>
                    <TableCell>
                      {qcDatum.qcStatus && <Status variant={qcDatum.qcStatus} />}
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
                                  `${ROUTES.LAB_COORD_QUALITY_CONTROL_DETAILS.path.replaceAll(':id', qcDatum.id)}`
                                )
                              }
                            >
                              <Eye />
                              View
                            </DropdownMenuItem>

                            {qcDatum?.wantDoctorRecommendation == 'yes' &&
                              qcDatum?.doctor === null && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    toggleModals({
                                      name: AppModals.AVAILABLE_DOCTORS,
                                      open: true,
                                      testId: qcDatum?.id ?? ''
                                    });
                                  }}
                                >
                                  <BriefcaseMedicalIcon />
                                  Assign Doctor
                                </DropdownMenuItem>
                              )}
                            {qcDatum.qcStatus && qcDatum.qcStatus == EnumResultStatus.PENDING && (
                              <DropdownMenuItem
                                onClick={() =>
                                  qcStatusMutate({
                                    payload: { status: EnumResultStatus.UNDER_REVIEW },
                                    id: qcDatum.id
                                  })
                                }
                              >
                                <Play />
                                Start
                              </DropdownMenuItem>
                            )}
                            {qcDatum.qcStatus &&
                              qcDatum.qcStatus === EnumResultStatus.UNDER_REVIEW && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    qcStatusMutate({
                                      payload: { status: EnumResultStatus.PENDING },
                                      id: qcDatum.id
                                    })
                                  }
                                >
                                  <Pause />
                                  Pause
                                </DropdownMenuItem>
                              )}
                            {qcDatum.qcStatus &&
                              qcDatum.qcStatus === EnumResultStatus.UNDER_REVIEW && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    toggleModals({
                                      open: true,
                                      name: AppModals.QC_STATUS_UPDATE,
                                      testId: qcDatum.id,
                                      currentStatus: qcDatum.qcStatus as EnumResultStatus
                                    });
                                  }}
                                >
                                  <Shield />
                                  Review
                                </DropdownMenuItem>
                              )}
                            {qcDatum.qcStatus && qcDatum.qcStatus === EnumResultStatus.FAILED && (
                              <DropdownMenuItem
                                onClick={() =>
                                  toggleModals({
                                    name: AppModals.AVAILABLE_TECHNICIANS,
                                    open: true,
                                    testId: qcDatum.id,
                                    isReassign: true
                                  })
                                }
                              >
                                <HandCoins />
                                Reassign
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )
        )}
      </Table>

      {isLoading ||
        (resultsData.requests.length === 0 && (
          <EmptyState title="No pending Quality control data" />
        ))}
    </div>
  );
};

export default observer(QCTable);
