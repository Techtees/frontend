import { Shield, Users } from 'lucide-react';
import { UserStatus } from './schema';
import { EnumRole, EnumUserStatus } from '@/constants/mangle';

export const callTypes = new Map<UserStatus, string>([
  [EnumUserStatus.ACTIVE, 'bg-blue-300/40 text-blue-400 dark:text-blue-200 border-blue-200'],
  [EnumUserStatus.UNAVAILABLE, 'bg-neutral-300/40 border-neutral-300 text-neutral-300'],
  [EnumUserStatus.INACTIVE, 'bg-neutral-300/40 border-neutral-300'],
  [
    EnumUserStatus.INVITED,
    'bg-violet-200/40 text-violet-900 dark:text-violet-100 border-violet-300'
  ],
  [EnumUserStatus.SUSPENDED, 'bg-red-500/40 dark:bg-red-500/50 text-red-500 border-red-500/10']
]);

export const userStatus = [
  {
    label: 'Active',
    value: EnumUserStatus.ACTIVE
  },
  {
    label: 'Inactive',
    value: EnumUserStatus.INACTIVE
  },
  {
    label: 'Invited',
    value: EnumUserStatus.INVITED
  },
  {
    label: 'Suspended',
    value: EnumUserStatus.SUSPENDED
  },
  {
    label: 'Unavailable',
    value: EnumUserStatus.UNAVAILABLE
  }
];

export const userTypes = [
  {
    label: 'Super Admin',
    value: EnumRole.SUPER_ADMIN,
    icon: Shield
  },
  {
    label: 'Receptionist',
    value: EnumRole.RECEPTIONIST,
    icon: Users
  },
  {
    label: 'Lab Coordinator',
    value: EnumRole.LAB_CORDINATOR,
    icon: Users
  },
  {
    label: 'Lab Technician',
    value: EnumRole.LAB_TECHNICIAN,
    icon: Users
  },
  {
    label: 'Marketer',
    value: EnumRole.MARKETER,
    icon: Users
  },
  {
    label: 'Referal Doctor',
    value: EnumRole.REFERRAL_DOCTOR,
    icon: Users
  },
  {
    label: 'Doctor',
    value: EnumRole.DOCTOR,
    icon: Users
  },
  {
    label: 'Tech Coordinator',
    value: EnumRole.TECHNICAL_COORDINATOR,
    icon: Users
  }
] as const;
