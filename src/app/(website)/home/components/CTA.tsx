import { Title } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
  return (
    <div className="w-full bg-white py-8 sm:py-10 md:py-12">
      <div
        className="mx-auto w-full max-w-7xl overflow-hidden rounded-lg py-8 sm:py-10 md:py-12"
        style={{
          backgroundImage: "url('/bg-cta.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex w-full flex-col items-center justify-between gap-6 px-4 py-8 text-center sm:px-6 sm:py-10 md:flex-row md:gap-8 md:px-10 md:py-12 md:text-left lg:px-12">
          <div className="max-w-md">
            <Title
              text="Start Your Healthcare Journey Today"
              className="text-xl font-bold text-white sm:text-2xl md:text-3xl"
            />
            <p className="mt-2 text-sm text-white/90 sm:mt-3 sm:text-base">
              Sign up for the best healthcare management experience.
            </p>
          </div>
          <Link
            href={ROUTES.LOGIN.path}
            className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 font-bold text-blue-400 shadow-lg transition hover:bg-blue-50 sm:w-auto sm:min-w-[200px] md:w-[250px] md:px-6 md:py-4"
          >
            <span>Get Started</span>
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
