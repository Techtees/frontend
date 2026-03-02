'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestContents from './components/TestContents';
import Hero from './hero';
import Link from 'next/link';
import { EnumAdminContentMgt } from '@/constants/mangle';
import { useSearchParams } from 'next/navigation';
import Testimonials from './testimonials';
import Partner from './partners';
import DoctorsFee from './doctors-fee';

const ContentManagementView = () => {
  const params = useSearchParams();
  const tab = params.get('tab');

  return (
    <div className="w-full">
      <Tabs value={tab ?? EnumAdminContentMgt.TESTS} className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value={EnumAdminContentMgt.TESTS}>
              <Link href={`?tab=${EnumAdminContentMgt.TESTS}`} shallow prefetch>
                Tests
              </Link>
            </TabsTrigger>
            <TabsTrigger value={EnumAdminContentMgt.HERO}>
              <Link href={`?tab=${EnumAdminContentMgt.HERO}`} shallow prefetch>
                Hero
              </Link>
            </TabsTrigger>
            <TabsTrigger value={EnumAdminContentMgt.TESTIMONIALS}>
              <Link href={`?tab=${EnumAdminContentMgt.TESTIMONIALS}`} shallow prefetch>
                Testimonials
              </Link>
            </TabsTrigger>
            <TabsTrigger disabled value={EnumAdminContentMgt.PARTNERS}>
              <Link href={`?tab=${EnumAdminContentMgt.PARTNERS}`} shallow prefetch>
                Partners
              </Link>
            </TabsTrigger>
            <TabsTrigger value={EnumAdminContentMgt.DOCTORS_FEE}>
              <Link href={`?tab=${EnumAdminContentMgt.DOCTORS_FEE}`} shallow prefetch>
                Doctors Fee
              </Link>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value={EnumAdminContentMgt.TESTS}>
            <TestContents />
          </TabsContent>
          <TabsContent className="w-full" value={EnumAdminContentMgt.HERO}>
            <Hero />
          </TabsContent>
          <TabsContent className="w-full" value={EnumAdminContentMgt.TESTIMONIALS}>
            <Testimonials />
          </TabsContent>
          <TabsContent className="w-full" value={EnumAdminContentMgt.PARTNERS}>
            <Partner />
          </TabsContent>
          <TabsContent className="w-full" value={EnumAdminContentMgt.DOCTORS_FEE}>
            <DoctorsFee />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ContentManagementView;
