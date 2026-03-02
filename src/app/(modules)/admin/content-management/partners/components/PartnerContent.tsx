'use client';
import PartnerLoader from './PartnerLoader';
import Partner from './Partner';
import EmptyPartners from './EmptyPartners';
import { useStore } from '@/store';

interface IPartnerContentProps {
  data: TAdminPartnerResp | undefined;
  isLoading: boolean;
}
const PartnerContent = ({ isLoading, data }: IPartnerContentProps) => {
  return (
    <div className="w-full">
      {isLoading && <PartnerLoader />}

      {data && (
        <div className="flex flex-col space-y-6">
          {data.partners.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {data.partners.map((el) => (
                <Partner key={el.id} partner={el} />
              ))}
            </div>
          ) : (
            <EmptyPartners />
          )}
        </div>
      )}
    </div>
  );
};

export default PartnerContent;
