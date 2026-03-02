'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import { defaultMenuConfig } from '@/config/menuItems';
import InputSearch from '@/atoms/fields/InputSearch';
import Button from '@/atoms/Buttons';

import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { Menu, Search, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface MenuItem {
  title: string;
  path?: string;
}

const MobileHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = (): void => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <div
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={70} height={40} />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
              aria-label="Search"
            >
              <Search size={24} />
            </button>

            <Sheet>
              <SheetTrigger asChild>
                <button className="text-gray-700 hover:text-blue-600 p-2" aria-label="Menu">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] p-0 sm:w-[350px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex h-full flex-col">
                  {/* <div className="flex items-center justify-between border-b p-4">
                    <Image src="/logo.png" alt="Logo" width={100} height={60} />
                  </div> */}

                  <ScrollArea className="flex-1">
                    <div className="py-4">
                      {defaultMenuConfig.map((item, index) => (
                        <div key={index} className="px-4">
                          <SheetClose asChild>
                            <button
                              className="text-gray-800 hover:text-blue-600 flex w-full py-3 text-left text-base font-medium"
                              onClick={() => {
                                if (item.title) {
                                  router.push(item.url);
                                }
                              }}
                            >
                              {item.title}
                            </button>
                          </SheetClose>
                          {index < defaultMenuConfig.length - 1 && <Separator className="my-1" />}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="border-t p-4">
                    <div className="grid grid-cols-2 gap-2">
                      <SheetClose asChild>
                        <Button
                          variant="outlined"
                          onClick={() => router.push(ROUTES.LOGIN.path)}
                          className="w-full"
                        >
                          Log in
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button variant="filled" className="w-full">
                          Contact us
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {searchOpen && (
          <div className="border-gray-100 border-t bg-white p-4 animate-in slide-in-from-top">
            <div className="relative">
              <InputSearch placeholder="Search" className="w-full rounded-full" autoFocus />
              <button
                className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 transform"
                onClick={() => setSearchOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileHeader;
