import Image from 'next/image';
import { Text } from '@/lib/utils/Text';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Edit2, Trash } from 'lucide-react';

interface IHeroCarouselProps {
  partner: TAdminPartnerItem;
}

const Partner = ({ partner }: IHeroCarouselProps) => {
  const { id, media } = partner;
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <div className="relative top-0 h-full w-full overflow-clip rounded-lg duration-700 ease-in-out">
      <div className="absolute right-2 top-2 z-40 space-x-1">
        <Button
          variant="outline"
          onClick={() =>
            toggleModals({
              name: AppModals.CREATE_PARTNER_MODAL,
              open: true,
              id: id
            })
          }
        >
          <Edit2 />
        </Button>

        <Button
          variant="destructive"
          onClick={() =>
            toggleModals({
              name: AppModals.DEL_PARTNER,
              open: true,
              id: id
            })
          }
        >
          <Trash />
        </Button>
      </div>
      {media && (
        <figure className="aspect-landscape w-full">
          <Image
            src={media[0].file_url}
            priority
            quality={100}
            fill
            sizes="100vw"
            className="h-full w-full object-cover"
            alt={''}
          />
        </figure>
      )}
    </div>
  );
};

export default Partner;
