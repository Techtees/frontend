import Button from '@/atoms/Buttons';
import { Text } from '@/lib/utils/Text';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

const analytics = [
  {
    title: 'Tests Available',
    number: '60+',
    icons: '/test.png'
  },

  {
    title: 'Serving Communities',
    number: '1000+',
    icons: '/customer.png'
  }
];

const carouselImages = [
  {
    src: '/hero6.png',
    title: 'Our World-Class Facility',
    description:
      'Delivering accurate, timely results with modern technology and compassionate care - where your best interest is our only priority',
    buttonText: 'Our Services',
    buttonColor: 'bg-green-400'
  },
  {
    src: '/hero5.png',
    title: 'World-Class Diagnostics',
    description:
      'Delivering accurate, timely results with modern technology and compassionate care - where your best interest is our only priority',
    buttonText: 'Our Services',
    buttonColor: 'bg-green-400'
  },
  {
    src: '/hero1.png',
    title: 'Healthcare Innovation',
    description:
      'Advancing medical excellence through collaboration, education, and cutting-edge diagnostic solutions that transform patient care',
    buttonText: 'Discover More',
    buttonColor: 'bg-blue-400'
  },
  {
    src: '/hero2.png',
    title: 'Research & Development',
    description:
      'Empowering groundbreaking discoveries with state-of-the-art facilities for molecular biology, biotechnology, and medical research',
    buttonText: 'Explore R&D',
    buttonColor: 'bg-purple-400'
  }
];

const Hero = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header =
        document.querySelector('header') ||
        document.querySelector('[data-header]') ||
        document.querySelector('nav');

      if (header) {
        const height = header.offsetHeight;
        setHeaderHeight(height);
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      } else {
        setHeaderHeight(100);
      }
    };

    calculateHeaderHeight();

    window.addEventListener('resize', calculateHeaderHeight);

    // Cleanup
    return () => window.removeEventListener('resize', calculateHeaderHeight);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="flex w-full items-center justify-center overflow-x-hidden bg-blue-400/50"
      id="home"
      style={{
        minHeight: `calc(100vh - ${headerHeight}px)`
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
          <div className="flex w-full flex-col justify-center lg:w-1/2">
            <div className="flex flex-col space-y-6 lg:space-y-8">
              <h1 className="text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-blue-400">Streamline</span> Your Healthcare and Research
                Experience with <span className="text-blue-400">NBIOTEK.</span>
              </h1>

              <p className="text-gray-700 max-w-2xl text-base lg:text-lg xl:text-xl">
                Get instant access to your medical test and result, and the latest Research &
                Development in one place
              </p>

              <div className="flex w-full flex-col space-y-3 sm:max-w-lg sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  variant="filled"
                  className="rounded-sm px-6 py-3 text-base font-semibold lg:px-8 lg:py-4 lg:text-lg"
                  onClick={() => router.push(ROUTES.LAB_TEST.path)}
                >
                  Book a Test
                </Button>
                <Button
                  variant="outlined"
                  className="rounded-sm border-none bg-green-400 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-green-400/80 lg:px-8 lg:py-4 lg:text-lg"
                  onClick={() => router.push(ROUTES.BIO_HUB.path)}
                >
                  Learn More About R&D
                </Button>
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-12">
                <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                  {analytics.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2.5 rounded-lg border border-white/20 bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-sm transition-colors hover:bg-white sm:px-3.5 sm:py-3 md:space-x-3 lg:px-5 lg:py-4"
                    >
                      <div className="flex-shrink-0">
                        <Image
                          src={item.icons}
                          alt={item.title}
                          width={32}
                          height={32}
                          className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Text
                          variant="h4"
                          className="text-blue-500 text-base font-bold sm:text-lg lg:text-xl"
                        >
                          {item.number.toLocaleString()}
                        </Text>
                        <Text className="line-clamp-2 text-xs font-medium text-neutral-700 sm:text-sm lg:text-base">
                          {item.title}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center lg:w-1/2">
            <div className="relative mx-auto h-[400px] w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl sm:h-[450px] lg:h-[500px] lg:max-w-2xl xl:h-[600px]">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute h-full w-full transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={`Slide ${index + 1}`}
                    width={800}
                    height={800}
                    priority={index === currentSlide}
                    className="h-full w-full object-cover object-center "
                  />
                  <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end">
                    <div className="w-full space-y-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-6 pb-6 pt-16 text-white lg:space-y-4 lg:px-8 lg:pb-8 lg:pt-20">
                      <Text variant="title" className="text-xl font-bold lg:text-2xl xl:text-3xl">
                        {image.title}
                      </Text>
                      <p className="text-sm leading-relaxed lg:text-base xl:text-lg">
                        {image.description}
                      </p>
                      <Button
                        variant="outlined"
                        className={`w-32 border-none text-sm font-semibold lg:w-36 lg:text-base ${image.buttonColor} transition-opacity hover:opacity-90`}
                      >
                        {image.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 justify-between lg:left-4 lg:right-4">
              <button
                onClick={goToPrevSlide}
                className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30 lg:p-3"
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30 lg:p-3"
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-0 right-0 lg:bottom-6">
              <div className="flex justify-center space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 lg:h-2.5 ${
                      index === currentSlide
                        ? 'w-8 bg-white lg:w-10'
                        : 'w-2 bg-white/50 hover:bg-white/70 lg:w-2.5'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
