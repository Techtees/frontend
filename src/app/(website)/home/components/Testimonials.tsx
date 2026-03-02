import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote:
      'NBIOTEK LABS has transformed how I receive healthcare. The telehealth service allowed me to consult with a specialist without traveling, and my test results were delivered promptly with clear explanations. Outstanding service!',
    name: 'Adaeze Okonkwo',
    role: 'Patient',
    avatar: '/avatar.jpg',
    rating: 5
  },
  {
    id: 2,
    quote:
      'As a physician, I rely on accurate diagnostics to make informed decisions. NBIOTEK LABS consistently delivers precise results with fast turnaround times. Their commitment to excellence is evident in every interaction.',
    name: 'Dr. Chukwuemeka Nwosu',
    role: 'Doctor',
    avatar: '/avatar.jpg',
    rating: 5
  },
  {
    id: 3,
    quote:
      'The R&D facilities at NBIOTEK are world-class. As a researcher, I appreciate their state-of-the-art equipment and supportive environment. They are truly advancing medical science in Nigeria.',
    name: 'Prof. Amina Bello',
    role: 'Researcher',
    avatar: '/avatar.jpg',
    rating: 5
  },
  {
    id: 4,
    quote:
      'From booking my test online to receiving results through their digital platform, everything was seamless. The staff was compassionate and professional. I highly recommend NBIOTEK LABS to anyone seeking quality healthcare.',
    name: 'Oluwaseun Adeleke',
    role: 'Patient',
    avatar: '/avatar.jpg',
    rating: 5
  },
  {
    id: 5,
    quote:
      'NBIOTEK LABS understands that patient care comes first. Their modern technology combined with a personal touch makes them stand out. They have set a new standard for diagnostic services in Nigeria.',
    name: 'Dr. Funmilayo Ibrahim',
    role: 'Doctor',
    avatar: '/avatar.jpg',
    rating: 5
  },
  {
    id: 6,
    quote:
      'I was impressed by the accuracy and reliability of my test results. The team at NBIOTEK took time to explain everything, making me feel confident about my health decisions. Truly patient-centered care.',
    name: 'Chidinma Okoro',
    role: 'Patient',
    avatar: '/avatar.jpg',
    rating: 5
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Responsive handling - update cards to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate visible indices based on cards to show
  const visibleIndices = Array.from(
    { length: cardsToShow },
    (_, i) => (currentIndex + i) % testimonials.length
  );

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Generate star rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 sm:h-5 sm:w-5 ${i < rating ? 'text-yellow' : 'text-yellow-300'}`}
          viewBox="0 0 20 20"
          fill="#FFC300"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div className="bg-[#F2F2F2] px-4 py-8 sm:px-6 sm:py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header section - responsive layout */}
        <div className="mb-6 flex flex-col space-y-4 sm:mb-8 md:mb-10 md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="max-w-xl md:max-w-2xl">
            <h2 className="text-gray-900 text-xl font-bold sm:text-2xl md:text-3xl">
              what our users and partners are saying: Hear from patients and doctors about their
              experiences with NBIOTEK.
            </h2>
          </div>
          <div className="flex space-x-2 self-end">
            <button
              onClick={handlePrev}
              className="rounded-full border border-neutral-300 p-1.5 transition hover:bg-green-400 hover:text-white sm:p-2"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="rounded-full border border-neutral-300 p-1.5 transition hover:bg-green-400 hover:text-white sm:p-2"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {/* {visibleIndices.map((index) => {
            const testimonial = testimonials[index];
            return (
              <div
                key={testimonial.id}
                className="rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-5 md:p-6"
              >
                <div className="mb-3 sm:mb-4">
                  <svg
                    className="h-6 w-6 text-green-400/30 sm:h-7 sm:w-7 md:h-8 md:w-8"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:mb-5 sm:text-base md:mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center">
                    <div className="relative mr-2 h-8 w-8 overflow-hidden rounded-full sm:mr-3 sm:h-10 sm:w-10">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-gray-900 text-sm font-medium sm:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
            );
          })} */}
        </div>

        <div className="mt-4 flex justify-center space-x-1 sm:mt-6 md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                visibleIndices.includes(index) ? 'bg-blue-500 w-4' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
