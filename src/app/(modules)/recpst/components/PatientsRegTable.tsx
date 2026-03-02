'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import EmptyState from '@/components/EmptyState';
import TableLoader from '@/atoms/Loaders/TableLoader';
import Pagination from '@/atoms/pagination';
import Status from '@/atoms/Buttons/Status';
import { formatTestDate } from '@/utils/date';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { EnumReceptionistQueryType } from '@/store/ReceptionistStore';
import { capitalizeWord, toTitleCase } from '@/utils';

interface IPatientsRegTableProps {
  isLoading: boolean;
  patient: TReceptAllPatientRes;
}

const PatientsRegTable = ({ isLoading, patient }: IPatientsRegTableProps) => {
  const router = useRouter();
  const pagination = patient.pagination;
  const {
    ReceptionistStore: { setLimit, setPage, queries }
  } = useStore();

  return (
    <div className="flex w-full flex-col space-y-6 overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted on</TableHead>
            <TableHead className="w-5"></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TableLoader rows={20} columns={8} />
        ) : (
          patient.patients.length !== 0 && (
            <TableBody>
              {patient.patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="whitespace-nowrap font-medium">
                    {patient?.patientSerialNo ?? '-'}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium">
                    {capitalizeWord(`${patient.firstName} ${patient.lastName}`)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{patient.email ?? '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">{patient.phoneNumber ?? '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {toTitleCase(patient?.patientPersonal?.gender ?? '-')}
                  </TableCell>
                  <TableCell>
                    <Status variant={patient.profileStatus} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatTestDate(patient.createdAt)}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {patient.isProfileCompleted ? (
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `${ROUTES.RECPTS_PATIENT_DETAILS.path.replaceAll(':id', patient.id)}`
                              )
                            }
                          >
                            View
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `${ROUTES.RECPTS_PATIENT_DETAILS.path.replaceAll(':id', patient.id)}`
                              )
                            }
                          >
                            Edit
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

      {patient.patients.length == 0 && <EmptyState title="No Patient data available." />}

      <div className="p-4">
        {isLoading || (
          <Pagination
            limit={queries.REG_PATIENTS.limit ?? pagination.limit}
            setLimit={(_limit: number) => setLimit(_limit, EnumReceptionistQueryType.REG_PATIENTS)}
            currentPage={queries.REG_PATIENTS.page ?? pagination.page}
            setPage={(_page: number) => setPage(_page, EnumReceptionistQueryType.REG_PATIENTS)}
            total={pagination.total}
            totalPages={pagination.totalPages}
            siblingCount={1}
          />
        )}
      </div>
    </div>
  );
};

export default observer(PatientsRegTable);
