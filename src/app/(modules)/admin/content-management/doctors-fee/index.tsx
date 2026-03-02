'use client';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import DoctorsFeeContent from './components/DoctorsFeeContent';
import { Plus } from 'lucide-react';
import { useFetchDoctorsFees } from '@/hooks/admin/useFetchDoctorsFees';

const DoctorsFee = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const { data, isLoading } = useFetchDoctorsFees();

  return (
    <div className="w-full">
      {isLoading || (
        <div className="flex w-full flex-col space-y-3 rounded-lg bg-white p-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div></div>

          <Button
            className="w-fit bg-blue-400"
            onClick={() => {
              toggleModals({ name: AppModals.CREATE_DOCTOR_FEE_MODAL, open: true, id: '' });
            }}
          >
            <Plus />
            Add doctor fee
          </Button>
        </div>
      )}

      <div>
        <DoctorsFeeContent {...{ data, isLoading }} />
      </div>
    </div>
  );
};

export default DoctorsFee;
