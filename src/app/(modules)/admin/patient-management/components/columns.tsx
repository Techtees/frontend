import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import LongText from '@/components/common/longText';
import { DataTableColumnHeader } from '../../user-management/components/TableHeader';
import Status from '@/atoms/Buttons/Status';

export const columns: ColumnDef<TAdminPatientItem>[] = [
  {
    id: 'serialNo',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Serial No" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.patientSerialNo}</div>;
    },
    meta: { className: 'w-32' }
  },
  {
    id: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const fullName = `${row.original.firstName} ${row.original.lastName}`;
      return <LongText className="max-w-36">{fullName}</LongText>;
    },
    meta: { className: 'w-36' }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <div className="w-fit text-nowrap">{row.getValue('email') || 'N/A'}</div>
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone Number" />,
    cell: ({ row }) => <div>{row.original.phoneNumber}</div>,
    enableSorting: false
  },
  {
    id: 'gender',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
    cell: ({ row }) => {
      const gender = row.original.patientPersonal?.gender;
      return <div className="capitalize">{gender ? gender : 'N/A'}</div>;
    },
    enableSorting: false
  },
  {
    accessorKey: 'profileStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.profileStatus;
      return (
        <Badge variant={status === 'COMPLETED' ? 'default' : 'secondary'} className="capitalize">
          {status.toLowerCase()}
        </Badge>
      );
    },
    enableSorting: false
  },
  {
    id: 'appointments',
    header: ({ column }) => <DataTableColumnHeader column={column} title="No. of Appointments" />,
    cell: ({ row }) => {
      const appointmentCount = row.original.appointments?.length || 0;
      return <div className="text-center">{appointmentCount}</div>;
    },
    enableSorting: false
  }
];
