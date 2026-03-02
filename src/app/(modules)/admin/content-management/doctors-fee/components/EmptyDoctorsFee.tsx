'use client';
import { DollarSign, Plus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Paragraph } from '@/atoms/typographys';
import Button from '@/atoms/Buttons';

const EmptyDoctorsFee = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <div className="mx-auto flex h-96 w-full max-w-96 items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <figure className="flex aspect-auto h-20 w-20 items-center justify-center rounded-full bg-neutral-50">
          <DollarSign size={60} />
        </figure>

        <div className="flex w-full flex-col items-center justify-center space-y-4 text-center">
          <Paragraph className="text-neutral-500">
            No doctor fees found. Add new fees to get started.
          </Paragraph>

          <div className="flex w-full flex-col items-center justify-start space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <Button
              variant="filled"
              leftIcon={<Plus size={17} />}
              text="Add doctor fee"
              onClick={() =>
                toggleModals({ open: true, name: AppModals.CREATE_DOCTOR_FEE_MODAL, id: '' })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(EmptyDoctorsFee);
