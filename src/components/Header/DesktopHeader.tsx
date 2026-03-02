'use client';

import { useState, useEffect, useCallback } from 'react';
import Button from '@/atoms/Buttons';
import InputSearch from '@/atoms/fields/InputSearch';
import Image from 'next/image';
import { defaultMenuConfig } from '@/config/menuItems';
import { useRouter, usePathname } from 'next/navigation';
import ROUTES from '@/constants/routes';
import Link from 'next/link';
import { CartIcon } from '@/lib/utils/svg';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string | null>(null);

  const {
    CartStore: { itemCount }
  } = useStore();

  const router = useRouter();
  const pathname = usePathname();

  const updateCurrentTab = useCallback(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const newTab = params.get('tab');
      setCurrentTab(newTab);
    }
  }, []);

  useEffect(() => {
    updateCurrentTab();

    window.addEventListener('popstate', updateCurrentTab);

    return () => {
      window.removeEventListener('popstate', updateCurrentTab);
    };
  }, [updateCurrentTab]);

  useEffect(() => {
    updateCurrentTab();
  }, [pathname, updateCurrentTab]);

  const handleNavigation = (url: string) => {
    const [path, query] = url.split('?');

    if (query) {
      const params = new URLSearchParams(query);
      const tabParam = params.get('tab');

      setCurrentTab(tabParam);
    } else {
      setCurrentTab(null);
    }

    router.push(url);
  };

  const isActive = (url: string) => {
    const [path, query] = url.split('?');

    if (!query) {
      return pathname === path;
    }

    if (path === '/lab-test' && pathname === '/lab-test') {
      const urlParams = new URLSearchParams(query);
      const tabParam = urlParams.get('tab');
      return tabParam === currentTab;
    }

    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top header section */}
      <div className="bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:py-4 md:px-6">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={90}
              height={40}
              className="h-10 w-auto sm:h-auto sm:w-[120px] md:w-[90px]"
            />
          </div>

          <div className="hidden flex-1 sm:flex sm:justify-center">
            <InputSearch placeholder="Search" className="!w-full max-w-2xl rounded-full" />
          </div>

          <div className="flex items-center space-x-2">
            <button
              className="relative"
              onClick={() => router.push(ROUTES.CART.path)}
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <CartIcon />
              {itemCount > 0 && (
                <span className="bg-blue-500 absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            <Button
              variant="filled"
              className="hidden px-3 py-1.5 text-sm md:block md:px-4 md:py-2"
              onClick={() => router.push(ROUTES.CONTACT_US.path)}
            >
              Contact us
            </Button>

            <Button
              variant="outlined"
              onClick={() => router.push(ROUTES.LOGIN.path)}
              className="px-3 py-1.5 text-sm md:px-4 md:py-2"
            >
              Log in
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="text-blue-500 flex items-center justify-center rounded-md p-2 sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile search */}
        <div className="px-4 pb-3 sm:hidden">
          <InputSearch placeholder="Search" className="!w-full rounded-full" />
        </div>
      </div>

      {/* Mobile action buttons */}
      <div className="flex items-center justify-between bg-white px-4 py-2 sm:hidden">
        <button
          className="relative flex items-center space-x-1"
          onClick={() => router.push(ROUTES.CART.path)}
        >
          <CartIcon />
          {itemCount > 0 && (
            <span className="bg-blue-500 absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
              {itemCount}
            </span>
          )}
          <span className="text-gray-700 text-sm">Cart</span>
        </button>

        <Button variant="filled" className="px-3 py-1.5 text-sm">
          Contact us
        </Button>
      </div>

      {/* Navigation */}
      <div
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-white shadow-md' : 'w-full bg-blue-400/10'
        }`}
      >
        {/* Desktop navigation */}
        <div className="mx-auto hidden max-w-7xl items-center justify-between px-4 py-3 sm:flex md:px-6">
          {defaultMenuConfig.map((item, index) => (
            <button
              key={index}
              className={`hover:text-blue-500 p-2 text-sm transition-colors md:text-base ${
                isActive(item.url)
                  ? 'text-blue-600 font-semibold underline underline-offset-4'
                  : 'text-[#004AAD]/90'
              }`}
              onClick={() => handleNavigation(item.url)}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Mobile navigation */}
        <div
          className={`
          fixed inset-0 z-50 transform bg-white transition-transform duration-300 ease-in-out sm:hidden
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        >
          <div className="border-gray-200 flex items-center justify-between border-b px-4 py-3">
            <Image src="/logo.png" alt="Logo" width={90} height={50} className="h-10 w-auto" />
            <button
              className="text-blue-500 rounded-md p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-4 flex flex-col px-4">
            {defaultMenuConfig.map((item, index) => (
              <button
                key={index}
                className={`border-gray-100 border-b py-4 text-left text-base ${
                  isActive(item.url) ? 'text-blue-600 font-semibold' : 'text-gray-800'
                }`}
                onClick={() => {
                  handleNavigation(item.url);
                  setMobileMenuOpen(false);
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Header);
