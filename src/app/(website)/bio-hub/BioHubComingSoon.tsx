'use client';

import { motion } from 'framer-motion';
import { Microscope, FlaskConical, Dna, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BioHubComingSoon() {
  const features = [
    {
      icon: Microscope,
      title: 'Advanced Research',
      description: 'Cutting-edge molecular biology and biotechnology research facilities'
    },
    {
      icon: FlaskConical,
      title: 'Innovation Lab',
      description: 'State-of-the-art equipment for groundbreaking discoveries'
    },
    {
      icon: Dna,
      title: 'Genetic Studies',
      description: 'Comprehensive genomics and personalized medicine research'
    }
  ];

  return (
    <div className="via-purple-50 to-pink-50 min-h-screen bg-gradient-to-br from-blue-50">
      <div className="container mx-auto px-4 py-20">
        {/* Main Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated Logo/Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="from-blue-500 to-purple-600 inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br shadow-2xl">
              <Microscope className="h-16 w-16 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-900 mb-6 text-5xl font-bold md:text-6xl"
          >
            BioHub
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="from-blue-600 to-purple-600 mb-4 bg-gradient-to-r bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
              Coming Soon
            </h2>
            <p className="text-gray-600 mx-auto max-w-2xl text-lg md:text-xl">
              We&apos;re building something extraordinary. NBIOTEK&apos;s BioHub will revolutionize
              healthcare research and innovation in Nigeria.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12 grid gap-8 md:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="to-purple-100 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100">
                  <feature.icon className="text-blue-600 h-8 w-8" />
                </div>
                <h3 className="text-gray-900 mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-gray-700 text-lg">
              Stay tuned for updates on our state-of-the-art research and development facilities.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-8 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                Back to Home
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/about"
                className="text-gray-800 hover:bg-gray-50 border-gray-200 inline-flex items-center gap-2 rounded-lg border bg-white px-8 py-3 font-semibold shadow-lg transition-all hover:shadow-xl"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16"
          >
            <div className="flex justify-center gap-2">
              <div className="bg-blue-500 h-2 w-2 animate-pulse rounded-full"></div>
              <div className="bg-purple-500 h-2 w-2 animate-pulse rounded-full delay-75"></div>
              <div className="bg-pink-500 h-2 w-2 animate-pulse rounded-full delay-150"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
