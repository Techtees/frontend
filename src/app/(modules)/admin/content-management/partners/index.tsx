'use client';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import PartnerContent from './components/PartnerContent';
import { Plus } from 'lucide-react';
import { useFetchPartners } from '@/hooks/admin/useFetchPartners';

const Partner = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const { data, isLoading } = useFetchPartners();

  return (
    <div className="w-full">
      {isLoading || (
        <div className="flex w-full flex-col space-y-3 rounded-lg bg-white p-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div></div>

          <Button
            className="w-fit bg-blue-400"
            onClick={() => {
              toggleModals({ name: AppModals.CREATE_PARTNER_MODAL, open: true, id: '' });
            }}
          >
            <Plus />
            Add partner
          </Button>
        </div>
      )}

      <div>
        <PartnerContent {...{ data, isLoading }} />
      </div>
    </div>
  );
};

export default Partner;
