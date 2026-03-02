'use client';

import { observer } from 'mobx-react-lite';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { useStore } from '@/store';
import { CartIcon } from '@/lib/utils/svg';
import Button from '@/atoms/Buttons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import { use, useState } from 'react';
import { set } from 'date-fns';

export const CartPopup = observer(() => {
  const {
    CartStore: { items, total, itemCount, removeItem }
  } = useStore();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleBookingForm = () => {
    setIsOpen(false);
    router.push(`${ROUTES.PATIENT_BOOK_APPOINTMENTS.path}`);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="p-0">
        <Button variant="filled" className="relative border-2 bg-transparent">
          <CartIcon />
          <span className="absolute -right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-400 text-[12px]">
            {itemCount > 0 ? itemCount : 0}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col">
        <SheetHeader>
          <SheetTitle className="text-center text-2xl ">
            {itemCount === 0 ? 'Empty Cart' : 'Your Cart'}
          </SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex-col items-center justify-center">
            <Image src="/empty_cart.jpg" width={500} height={300} alt="Empty cart" />
            <p className="text-center text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-6">
              {items.map((cartItem) => (
                <div key={cartItem.id} className="flex items-start gap-4 border-b py-4">
                  <div className="flex-1">
                    <h3 className="font-medium">{cartItem.item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cartItem.type === 'single' ? 'Individual Test' : 'Test Package'}
                    </p>
                    <div className="mt-1 text-sm">
                      {'discountedPrice' in cartItem.item && cartItem.item.discountedPrice !== 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-primary">
                            ₦{cartItem.item.discountedPrice}
                          </span>
                          <span className="text-muted-foreground line-through">
                            ₦{cartItem.item.price}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium text-primary">₦{cartItem.item.price}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outlined"
                      className="h-7 w-7 rounded-full  "
                      onClick={() => removeItem(cartItem.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter>
              <div className="bottom-12  w-full  space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Total ({items.length} Products)</span>
                  <span className="font-medium">₦{total.toLocaleString()}</span>
                </div>
                <Button className="w-full" variant="filled" onClick={handleBookingForm}>
                  Proceed to Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
});
