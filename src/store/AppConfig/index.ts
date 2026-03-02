import { action, makeObservable, observable, toJS } from 'mobx';
import { RootStore } from '..';
import { AppModals, TAppModalsAction } from './appModalTypes';
import initializer from '@/utils/initializer';
import { EnumResultStatus } from '@/atoms/Buttons/Status';

const INIT_IS_OPEN = initializer(AppModals, false);
const INIT_IS_LOADING = {
  toggle_media_visibility: false
};

class AppConfigStore {
  rootStore: RootStore;
  queryLimit: number = 10;
  mediaMultiple: boolean = true;
  files: Array<TRemoteFile> = [];

  isOpen = { ...INIT_IS_OPEN };
  isLoading = { ...INIT_IS_LOADING };
  errors = initializer(this.isLoading, '');
  nonce = 0;

  testDetails = {
    testId: '',
    originalTestId: ''
  };

  testTemplateModal = {
    testId: '',
    mode: 'create' as 'create' | 'edit'
  };

  availableLabTechnicians: { testId: string; isReassign?: boolean } = {
    testId: ''
  };

  availableMarketers: { testId: string; isReassign?: boolean } = {
    testId: ''
  };

  availableDoctors: { testId: string; isReassign?: boolean } = {
    testId: ''
  };

  qcStatusUpdate = {
    testId: '',
    currentStatus: EnumResultStatus.PENDING
  };

  singleAppt = {
    id: ''
  };

  data = {
    id: ''
  };

  testAvailability = {
    id: '',
    status: '',
    type: ''
  };

  fileModalUpload = {
    handlerFn: (files: File[]) => {}
  };

  dataModal = {
    id: ''
  };

  partnerModal = {
    id: '',
    media: undefined as Array<IMediaResp> | undefined,
    status: ''
  };

  doctorFeeModal = {
    id: '',
    feature: '',
    value: ''
  };

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      isOpen: observable,
      isLoading: observable,
      errors: observable,
      files: observable,
      mediaMultiple: observable,
      nonce: observable,
      testDetails: observable,
      testTemplateModal: observable,
      queryLimit: observable,
      availableLabTechnicians: observable,
      availableMarketers: observable,
      availableDoctors: observable,
      qcStatusUpdate: observable,
      data: observable,
      testAvailability: observable,
      dataModal: observable,
      fileModalUpload: observable,
      partnerModal: observable,
      doctorFeeModal: observable,

      addFiles: action.bound,
      removeFiles: action.bound,
      setFiles: action.bound,
      setModalOpenState: action.bound,
      toggleModals: action.bound,
      setMediaMultiple: action.bound,
      resetMedia: action.bound
    });
    this.rootStore = _rootStore;
  }

  addFiles(_files: TRemoteFile) {
    this.files.push(_files);
  }

  removeFiles = (uuid: string) => {
    this.files = this.files.filter((file) => file.uuid !== uuid);
  };

  setFiles = (_files: Array<TRemoteFile>) => {
    this.files = _files;
  };

  setModalOpenState(name: AppModals, open?: boolean) {
    this.isOpen[name] = typeof open === 'undefined' ? !this.isOpen[name] : open;
  }

  toggleModals(modal: TAppModalsAction = {}) {
    switch (modal.name) {
      case '':
        break;
      case AppModals.RESULT_UPLOAD_MODAL:
        if (modal.open) {
          this.testDetails = {
            testId: modal.testId,
            originalTestId: modal.originalTestId ?? ''
          };
        }
        break;
      case AppModals.AVAILABLE_TECHNICIANS:
        if (modal.open) {
          this.availableLabTechnicians = {
            testId: modal.testId,
            isReassign: Boolean(modal.isReassign)
          };
        }
        break;
      case AppModals.AVAILABLE_MARKETERS:
        if (modal.open) {
          this.availableMarketers = {
            testId: modal.testId,
            isReassign: Boolean(modal.isReassign)
          };
        }
        break;
      case AppModals.AVAILABLE_DOCTORS:
        if (modal.open) {
          this.availableDoctors = {
            testId: modal.testId,
            isReassign: Boolean(modal.isReassign)
          };
        }
        break;
      case AppModals.QC_STATUS_UPDATE:
        if (modal.open) {
          this.qcStatusUpdate = {
            testId: modal.testId,
            currentStatus: modal.currentStatus
          };
        }
        break;
      case AppModals.SINGLE_APPOINTMENT:
        if (modal.open) {
          this.singleAppt = {
            id: modal.id
          };
        }
        break;
      case AppModals.UPDATE_APPOINTMENT:
        if (modal.open) {
          this.singleAppt = {
            id: modal.id
          };
        }
        break;
      case AppModals.ADMIN_SINGLE_TEST:
        if (modal.open) {
          this.testDetails = {
            testId: modal.testId,
            originalTestId: ''
          };
        }
        break;
      case AppModals.ADMIN_PACKAGE_TEST:
        if (modal.open) {
          this.testDetails = {
            testId: modal.testId,
            originalTestId: ''
          };
        }
        break;
      case AppModals.ADMIN_TEST_TEMPLATE:
        if (modal.open) {
          this.testTemplateModal = {
            testId: modal.testId,
            mode: modal.mode ?? 'create'
          };
        }
        break;
      case AppModals.ADMIN_DELETE_USER:
        if (modal.open) {
          this.data = {
            id: modal.id
          };
        }
        break;
      case AppModals.ADMIN_SUSPEND_USER:
        if (modal.open) {
          this.data = {
            id: modal.id
          };
        }
        break;

      case AppModals.ADMIN_UNSUSPEND_USER:
        if (modal.open) {
          this.data = {
            id: modal.id
          };
        }
        break;

      case AppModals.DEL_TEST_TEMPLATE_MODAL:
        if (modal.open) {
          this.data = {
            id: modal.id
          };
        }
        break;

      case AppModals.ADMIN_TOGGLE_TEST_AVAILABILITY:
        if (modal.open) {
          this.testAvailability = {
            id: modal.id,
            status: modal.status,
            type: modal.type
          };
        }
        break;

      case AppModals.FILE_UPLOAD_MODAL:
        if (modal.open) {
          this.fileModalUpload = {
            handlerFn: modal.handlerFn
          };
        }
        break;

      case AppModals.CREATE_HERO_SECTION_MODAL:
        if (modal.open) {
          this.dataModal = {
            id: modal.id
          };
        }
        break;
      case AppModals.CREATE_HERO_CAROUSEL_MODAL:
        if (modal.open) {
          this.dataModal = {
            id: modal.id
          };
        }
        break;
      case AppModals.CREATE_PARTNER_MODAL:
        if (modal.open) {
          this.partnerModal.id = modal.id;

          if (modal.status) {
            this.partnerModal.status = modal.status;
          }

          if (modal.media) {
            this.partnerModal.media = toJS(modal.media);
          }
        }
        break;
      case AppModals.DEL_HERO_CAROUSEL:
        if (modal.open) {
          this.dataModal = {
            id: modal.id
          };
        }
        break;
      case AppModals.DEL_PARTNER:
        if (modal.open) {
          this.partnerModal.id = modal.id;
        }
        break;
      case AppModals.CREATE_TESTIMONIAL_MODAL:
        if (modal.open) {
          this.dataModal = {
            id: modal.id
          };
        }
        break;
      case AppModals.DEL_TESTIMONIAL_MODAL:
        if (modal.open) {
          this.dataModal = {
            id: modal.id
          };
        }
        break;
      case AppModals.CREATE_DOCTOR_FEE_MODAL:
        if (modal.open) {
          this.doctorFeeModal.id = modal.id;

          if (modal.feature) {
            this.doctorFeeModal.feature = modal.feature;
          }

          if (modal.value) {
            this.doctorFeeModal.value = modal.value;
          }
        }
        break;
      case AppModals.DEL_DOCTOR_FEE_MODAL:
        if (modal.open) {
          this.doctorFeeModal.id = modal.id;
        }
        break;
      default:
        this.isOpen = { ...INIT_IS_OPEN };
        break;
    }
    if (modal.name && AppModals[modal.name] !== undefined) {
      this.setModalOpenState(modal.name, modal.open);
    }

    this.nonce = Date.now() + Math.random();
  }

  setMediaMultiple(_isMultiple: boolean) {
    this.mediaMultiple = _isMultiple;
  }

  resetMedia() {
    this.mediaMultiple = true;
  }
}

export default AppConfigStore;
