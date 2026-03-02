import {
  Home,
  User,
  CalendarClock,
  TestTubeDiagonal,
  NotepadText,
  CreditCard,
  Phone,
  LayoutDashboard,
  Hospital,
  ClipboardList,
  UserCircle,
  FileText,
  Settings,
  ShieldCheck,
  Bell,
  Book,
  BellDot,
  PhoneCall,
  Settings2,
  UsersIcon,
  PhoneCallIcon,
  FilesIcon,
  FileTextIcon,
  UserCircle2Icon,
  NotebookIcon,
  SettingsIcon,
  User2Icon,
  FolderPenIcon,
  PhoneIcon
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { EnumRole } from '@/constants/mangle';
import ROUTES from '@/constants/routes';

export type UserRole = 'patient';

export interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  isNestable?: boolean;
  submenu?: Array<{
    title: string;
    url: string;
    isNestable?: boolean;
  }>;
}

export interface WebsiteMenu {
  title: string;
  url: string;
}

export const menuConfig: Record<string, MenuItem[]> = {
  [EnumRole.PATIENT]: [
    {
      title: ROUTES.PATIENT.title,
      url: ROUTES.PATIENT.path,
      icon: Home
    },
    {
      title: ROUTES.PATIENT_INFO.title,
      url: ROUTES.PATIENT_INFO.path,
      icon: User
    },
    {
      title: 'Appointments',
      icon: CalendarClock,
      submenu: [
        {
          title: ROUTES.PATIENT_BOOK_APPOINTMENTS.title,
          url: ROUTES.PATIENT_BOOK_APPOINTMENTS.path
        },
        {
          title: ROUTES.PATIENT_UPCOMING_APPOINTMENTS.title,
          url: ROUTES.PATIENT_UPCOMING_APPOINTMENTS.path
        },
        {
          title: ROUTES.PATIENT_PENDING_APPOINTMENTS.title,
          url: ROUTES.PATIENT_PENDING_APPOINTMENTS.path
        },
        {
          title: ROUTES.PATIENT_PAST_APPOINTMENTS.title,
          url: ROUTES.PATIENT_PAST_APPOINTMENTS.path
        }
      ]
    },
    {
      title: 'Test request',
      icon: TestTubeDiagonal,
      url: ROUTES.PATIENT_AVAILABLE_TEST.path
    },
    {
      title: 'Test Results',
      url: ROUTES.PATIENT_TEST_RESULT.path,
      icon: NotepadText
    },
    {
      title: 'Biling & Payment',
      icon: CreditCard,
      url: ROUTES.PATIENT_BILLING_TRANSACTION_HISTORY.path
    }
  ],

  [EnumRole.DOCTOR]: [
    {
      title: ROUTES.DOCTOR.title,
      url: ROUTES.DOCTOR.path,
      icon: LayoutDashboard
    },
    {
      title: ROUTES.DOCTOR_TEST_REVIEW.title,
      url: ROUTES.DOCTOR_TEST_REVIEW.path,
      icon: NotepadText
    },
    {
      title: ROUTES.DOCTOR_APPOINTMENT.title,
      icon: CalendarClock,
      submenu: [
        {
          title: 'All ',
          url: ROUTES.DOCTOR_APPOINTMENT.path
        },
        {
          title: 'Create',
          url: ROUTES.DOCTOR_CREATE_APPOINTMENT.path
        }
      ]
    },
    {
      title: ROUTES.DOCTOR_REFERRALS.title,
      url: ROUTES.DOCTOR_REFERRALS.path,
      icon: Hospital
    }
  ],

  [EnumRole.LAB_TECHNICIAN]: [
    {
      title: ROUTES.LAB_TECH.title,
      url: ROUTES.LAB_TECH.path,
      icon: Home
    },
    {
      title: ROUTES.LAB_TECH_TEST.title,
      url: ROUTES.LAB_TECH_TEST.path,
      icon: TestTubeDiagonal,
      isNestable: true
    },
    {
      title: ROUTES.LAB_TECH_TEST_TEMPLATES.title,
      url: ROUTES.LAB_TECH_TEST_TEMPLATES.path,
      icon: FileText,
      isNestable: true
    },
    {
      title: ROUTES.LAB_TECH_RESULT_HISTORY.title,
      icon: Book,
      url: ROUTES.LAB_TECH_RESULT_HISTORY.path,
      isNestable: true
    },
    {
      title: ROUTES.LAB_TECH_QUALITY_CONTROL.title,
      icon: ShieldCheck,
      url: ROUTES.LAB_TECH_QUALITY_CONTROL.path,
      isNestable: true
    }
  ],

  [EnumRole.LAB_CORDINATOR]: [
    {
      title: ROUTES.LAB_COORD.title,
      url: ROUTES.LAB_COORD.path,
      icon: Home
    },
    {
      title: ROUTES.LAB_COORD_TEST_SCHEDULING.title,
      url: ROUTES.LAB_COORD_TEST_SCHEDULING.path,
      icon: TestTubeDiagonal,
      isNestable: true
    },
    {
      title: ROUTES.LAB_COORD_QUALITY_CONTROL.title,
      url: ROUTES.LAB_COORD_QUALITY_CONTROL.path,
      icon: ShieldCheck,
      isNestable: true
    }
  ],

  [EnumRole.MARKETER]: [
    {
      title: ROUTES.MARKETER.title,
      url: ROUTES.MARKETER.path,
      icon: Home
    },
    {
      title: ROUTES.MARKETER_FIELD_VISIT.title,
      url: ROUTES.MARKETER_FIELD_VISIT.path,
      icon: UsersIcon
    },
    {
      title: ROUTES.MARKETER_SETTINGS.title,
      url: ROUTES.MARKETER_SETTINGS.path,
      icon: Settings
    }
  ],

  [EnumRole.RECEPTIONIST]: [
    {
      title: ROUTES.RECPTS.title,
      url: ROUTES.RECPTS.path,
      icon: Home
    },

    {
      title: ROUTES.RECPTS_APOINTMENT.title,
      url: ROUTES.RECPTS_APOINTMENT.path,
      icon: CalendarClock
    },

    {
      title: ROUTES.RECPTS_PATIENT.title,
      url: ROUTES.RECPTS_PATIENT.path,
      icon: UserCircle2Icon,
      isNestable: true
    }
  ],

  [EnumRole.SUPER_ADMIN]: [
    {
      title: ROUTES.SUPER_ADMIN.title,
      url: ROUTES.SUPER_ADMIN.path,
      icon: Home
    },
    {
      title: ROUTES.SUPER_ADMIN_USER_MANAGEMENT.title,
      url: ROUTES.SUPER_ADMIN_USER_MANAGEMENT.path,
      icon: User2Icon
    },
    {
      title: ROUTES.SUPER_ADMIN_PATIENT_MANAGEMENT.title,
      url: ROUTES.SUPER_ADMIN_PATIENT_MANAGEMENT.path,
      icon: UsersIcon
    },
    {
      title: ROUTES.SUPER_ADMIN_CONTENT_MANAGEMENT.title,
      url: ROUTES.SUPER_ADMIN_CONTENT_MANAGEMENT.path,
      icon: FolderPenIcon
    }
  ]
};

export const menuCommon: MenuItem[] = [
  {
    title: ROUTES.NOTIFICATION.title,
    url: ROUTES.NOTIFICATION.path,
    icon: BellDot
  },
  {
    title: ROUTES.SETTINGS.title,
    url: ROUTES.SETTINGS.path,
    icon: SettingsIcon
  },
  {
    title: ROUTES.SUPPORT.title,
    url: ROUTES.SUPPORT.path,
    icon: PhoneCallIcon
  }
];

export const defaultMenuConfig: WebsiteMenu[] = [
  {
    title: ROUTES.HOME.title,
    url: ROUTES.HOME.path
  },
  {
    title: 'About Us',
    url: ROUTES.ABOUT.path
  },

  {
    title: ROUTES.LAB_TEST.title,
    url: ROUTES.LAB_TEST.path
  },
  {
    title: ROUTES.SPECIAL_PACKAGES.title,
    url: ROUTES.SPECIAL_PACKAGES.path
  },
  {
    title: ROUTES.ADVANCED_IMAGING.title,
    url: ROUTES.ADVANCED_IMAGING.path
  },
  {
    title: ROUTES.MOLECULAR_DIAGNOSTICS.title,
    url: ROUTES.MOLECULAR_DIAGNOSTICS.path
  },
  {
    title: ROUTES.BIO_HUB.title,
    url: ROUTES.BIO_HUB.path
  },
  {
    title: ROUTES.ECOMMERCE.title,
    url: ROUTES.ECOMMERCE.path
  },
  {
    title: ROUTES.WHATS_NEW.title,
    url: ROUTES.WHATS_NEW.path
  }
];
