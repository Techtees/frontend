'use client';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ModalsMap = {
  [AppModals.RESULT_UPLOAD_MODAL]: dynamic(
    () => import('@/app/(modules)/lab-tech/tests/components/ResultUploadModal')
  ),
  [AppModals.LOG_OUT_MODAL]: dynamic(() => import('@/components/dashboard/Sidebar/LogoutModal')),
  [AppModals.AVAILABLE_TECHNICIANS]: dynamic(
    () => import('@/app/(modules)/lab-coord/components/modals/LabTechModal')
  ),
  [AppModals.ADD_INVENTORY]: dynamic(
    () => import('@/app/(modules)/lab-coord/inventory/components/AddInventoryModal')
  ),
  [AppModals.QC_STATUS_UPDATE]: dynamic(
    () => import('@/app/(modules)/lab-coord/components/modals/QCStatusModal')
  ),
  [AppModals.RECPTS_PATIENT_REG]: dynamic(
    () => import('@/app/(modules)/recpst/components/modals/RegPatientModal')
  ),
  [AppModals.AVAILABLE_MARKETERS]: dynamic(
    () => import('@/app/(modules)/lab-coord/components/modals/MarketersModal')
  ),
  [AppModals.AVAILABLE_DOCTORS]: dynamic(
    () => import('@/app/(modules)/lab-coord/components/modals/DoctorsModal')
  ),
  [AppModals.SINGLE_APPOINTMENT]: dynamic(
    () => import('@/app/(modules)/recpst/appt/components/modals/SingleApptModal')
  ),
  [AppModals.UPDATE_APPOINTMENT]: dynamic(
    () => import('@/app/(modules)/recpst/appt/components/modals/UpdateApptModal')
  ),
  [AppModals.ADMIN_ADD_USER]: dynamic(
    () => import('@/app/(modules)/admin/user-management/components/modal/AddUserModal')
  ),
  [AppModals.ADMIN_SINGLE_TEST]: dynamic(
    () => import('@/app/(modules)/admin/content-management/components/modals/TestModal')
  ),
  [AppModals.ADMIN_PACKAGE_TEST]: dynamic(
    () => import('@/app/(modules)/admin/content-management/components/modals/PackageTestModal')
  ),
  [AppModals.ADMIN_TEST_TEMPLATE]: dynamic(
    () => import('@/app/(modules)/admin/content-management/components/modals/TestTemplateModal')
  ),
  [AppModals.ADMIN_DELETE_USER]: dynamic(
    () => import('@/app/(modules)/admin/user-management/components/modal/DeleteModal')
  ),
  [AppModals.ADMIN_SUSPEND_USER]: dynamic(
    () => import('@/app/(modules)/admin/user-management/components/modal/SuspendModal')
  ),
  [AppModals.ADMIN_UNSUSPEND_USER]: dynamic(
    () => import('@/app/(modules)/admin/user-management/components/modal/UnsuspendModal')
  ),
  [AppModals.ADMIN_TOGGLE_TEST_AVAILABILITY]: dynamic(
    () => import('@/app/(modules)/admin/content-management/components/modals/ToggleTestModal')
  ),
  [AppModals.FILE_UPLOAD_MODAL]: dynamic(() => import('@/atoms/modal/FileUploadModal')),
  [AppModals.CREATE_HERO_SECTION_MODAL]: dynamic(
    () => import('@/app/(modules)/admin/content-management/hero/components/modal/CreateHeroModal')
  ),
  [AppModals.CREATE_HERO_CAROUSEL_MODAL]: dynamic(
    () => import('@/app/(modules)/admin/content-management/hero/components/modal/HeroCarouselModal')
  ),
  [AppModals.DEL_HERO_CAROUSEL]: dynamic(
    () => import('@/app/(modules)/admin/content-management/hero/components/modal/DelCarouselModal')
  ),
  [AppModals.CREATE_TESTIMONIAL_MODAL]: dynamic(
    () =>
      import(
        '@/app/(modules)/admin/content-management/testimonials/components/modal/AdminTestimonialModal'
      )
  ),
  [AppModals.DEL_TESTIMONIAL_MODAL]: dynamic(
    () =>
      import(
        '@/app/(modules)/admin/content-management/testimonials/components/modal/DelTestimonialModal'
      )
  ),
  [AppModals.DEL_PARTNER]: dynamic(
    () =>
      import('@/app/(modules)/admin/content-management/partners/components/modal/DelPartnerModal')
  ),
  [AppModals.CREATE_PARTNER_MODAL]: dynamic(
    () =>
      import('@/app/(modules)/admin/content-management/partners/components/modal/AddPartnerModal')
  ),
  [AppModals.CREATE_DOCTOR_FEE_MODAL]: dynamic(
    () =>
      import(
        '@/app/(modules)/admin/content-management/doctors-fee/components/modal/AddDoctorFeeModal'
      )
  ),
  [AppModals.DEL_DOCTOR_FEE_MODAL]: dynamic(
    () =>
      import(
        '@/app/(modules)/admin/content-management/doctors-fee/components/modal/DelDoctorFeeModal'
      )
  ),
  [AppModals.DEL_TEST_TEMPLATE_MODAL]: dynamic(
    () => import('@/app/(modules)/admin/content-management/components/modals/DelTestTemplateModal')
  )
};

const ModalsBank = () => {
  const {
    AppConfigStore: { isOpen, nonce }
  } = useStore();

  const OpenedModalsComponent = useMemo(() => {
    return Object.entries(ModalsMap).reduce(
      (acc: { Render: React.ReactNode; name: string }[], [keyName, Component]) => {
        if (isOpen[keyName as keyof typeof AppModals]) {
          acc.push({ Render: <Component key={keyName} />, name: keyName });
        }
        return acc;
      },
      []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, nonce]);

  return <>{OpenedModalsComponent.map((Modal) => Modal.Render)}</>;
};

export default observer(ModalsBank);
