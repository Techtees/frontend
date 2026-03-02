import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import { BoxIcon } from 'lucide-react';

interface PartnerLogo {
  id: number;
  src: string;
  alt: string;
  width: number;
}

const partnerLogos: PartnerLogo[] = [
  {
    id: 1,
    src: '/seamaty.png',
    alt: 'Karmen Pet Hospital',
    width: 120
  }
];

const PartnerSection: React.FC = () => {
  return (
    <section className="bg-blue-300/10 py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h2 className="text-gray-800 mb-6 text-center text-xl font-bold sm:mb-8 md:mb-10 md:text-2xl">
          Partner <span className="text-blue-800">&</span> Friend
        </h2>

        <div className="overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: Math.min(partnerLogos.length, 5),
                spaceBetween: 40
              }
            }}
            className="partner-swiper py-2"
          >
            {partnerLogos.map((logo) => (
              <SwiperSlide key={logo.id} className="flex items-center justify-center px-2">
                <div className="sm:h-18 flex h-16 items-center justify-center rounded-lg bg-white/50 p-2 shadow-sm md:h-20">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={60}
                    className="h-10 max-w-[80%] object-contain sm:h-12 md:h-14"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-4 flex justify-center md:hidden">
          <div className="flex space-x-1">
            {[...Array(Math.min(5, partnerLogos.length))].map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === 0 ? 'bg-blue-500 w-3' : 'bg-gray-300 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
