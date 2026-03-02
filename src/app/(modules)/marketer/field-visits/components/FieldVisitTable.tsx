import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Status from '@/atoms/Buttons/Status';
import { EllipsisVertical, PlayCircle, Upload, UploadCloud, UploadIcon, View } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import TableLoader from '@/atoms/Loaders/TableLoader';
import { dateTimeUTC } from '@/utils/date';
import ROUTES from '@/constants/routes';

interface FieldVisitTableProps {
  loading?: boolean;
  fieldTask: Array<TFieldTestRequest>;
}

import { useUpdateFieldVisit } from '@/hooks/marketer/useFieldTask';
import { Toast } from '@/atoms/Toast';
import EmptyState from '@/components/EmptyState';

const FieldVisitTable = ({ loading, fieldTask }: FieldVisitTableProps) => {
  const router = useRouter();
  const { mutate: startFieldVisit, isPending } = useUpdateFieldVisit();

  const handleStartFieldVisit = (fieldVisitId: string) => {
    startFieldVisit(
      { fieldVisitId, status: 'IN_PROGRESS' },
      {
        onSuccess: () => {
          Toast.success('Field visit started successfully');
          router.push(ROUTES.MARKETER_FIELD_VISIT.path);
        }
      }
    );
  };

  return (
    <>
      <div className="overflow-clip rounded-lg">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>Test Id</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <TableLoader columns={7} rows={5} />
          ) : (
            fieldTask.length !== 0 && (
              <TableBody>
                {fieldTask.map((fieldVisit) => (
                  <TableRow key={fieldVisit.id}>
                    <TableCell>{fieldVisit.testId}</TableCell>
                    <TableCell>{fieldVisit.patientName}</TableCell>
                    <TableCell>{fieldVisit.testName}</TableCell>
                    <TableCell>{fieldVisit.location.address}</TableCell>
                    <TableCell>{dateTimeUTC(fieldVisit.createdAt)}</TableCell>
                    <TableCell>
                      <Status variant={fieldVisit.status} />
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="w-8 px-0">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {fieldVisit.status === 'PENDING' ? (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleStartFieldVisit(fieldVisit.id)}
                              >
                                <span className="flex items-center ">
                                  {' '}
                                  Start Test <PlayCircle className="ml-2 w-4" color="#550000" />
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(
                                    `${ROUTES.MARKETER_FIELD_VISIT.path}/${fieldVisit.id}`
                                  )
                                }
                              >
                                <span className="flex items-center ">
                                  {' '}
                                  View Sample <View className="ml-2 w-4" color="#FF2E2E" />
                                </span>
                              </DropdownMenuItem>
                            </>
                          ) : fieldVisit.status === 'IN_PROGRESS' ? (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(
                                    `${ROUTES.MARKETER_FIELD_VISIT.path}/${fieldVisit.id}`
                                  )
                                }
                              >
                                <span className="flex items-center ">
                                  {' '}
                                  Upload sample <UploadIcon className="ml-2 w-4" color="#008000" />
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(
                                    `${ROUTES.MARKETER_FIELD_VISIT.path}/${fieldVisit.id}`
                                  )
                                }
                              >
                                <span className="flex items-center ">
                                  {' '}
                                  View Sample <View className="ml-2 w-4" color="#FF2E2E" />
                                </span>
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`${ROUTES.MARKETER_FIELD_VISIT.path}/${fieldVisit.id}`)
                              }
                            >
                              <span className="flex items-center ">
                                {' '}
                                View Sample <View className="ml-2 w-4" color="#FF2E2E" />
                              </span>
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
        {!loading && fieldTask.length === 0 && <EmptyState />}
      </div>
    </>
  );
};

export default FieldVisitTable;
