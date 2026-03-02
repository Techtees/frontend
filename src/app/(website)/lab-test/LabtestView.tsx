'use client';

import { useState, useEffect, Suspense } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

import TestCard from './components/TestCard';
import PackageTestCard from './components/PackageTestCard';
import { PackageTestSkeleton, TestCardSkeleton } from './components/TestCardSkeleton';
import Button from '@/atoms/Buttons';

import {
  useLabTestsWithLoadMore,
  usePackageTestsWithLoadMore,
  useMolecularTestsWithLoadMore,
  useAdvancedImagingTestsWithLoadMore
} from '@/hooks/patient/useTest';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';

const LabTestViewFallback = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="bg-gradient-to-br from-blue-400 to-blue-400 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 h-12 w-3/4 animate-pulse rounded-lg bg-blue-300"></div>
            <div className="mx-auto mb-8 h-8 w-2/3 animate-pulse rounded-lg bg-blue-200"></div>
            <div className="mx-auto mb-8 h-16 w-full animate-pulse rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-gray-200 mb-8 h-12 w-full animate-pulse rounded-lg"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-gray-200 h-64 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LoadingState = ({ type }: { type: 'individual' | 'package' }) => (
  <div
    className={
      type === 'individual' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-8'
    }
  >
    {Array.from({ length: 5 }, (_, i) =>
      type === 'individual' ? <TestCardSkeleton key={i} /> : <PackageTestSkeleton key={i} />
    )}
  </div>
);

const NoResults = ({ searchQuery, testType }: { searchQuery: string; testType: string }) => (
  <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
    <div className="mb-6 rounded-full bg-blue-100 p-4">
      <Search className="text-blue-500 h-8 w-8" />
    </div>
    <h3 className="text-gray-900 mb-2 text-xl font-semibold">No {testType} found</h3>
    <p className="text-gray-600 mb-6 max-w-md">
      We couldn&apos;t find any {testType} matching &quot;{searchQuery}&quot;. Try a different
      search term or browse our available tests.
    </p>
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button variant="outlined" onClick={() => window.location.reload()}>
        Clear Search
      </Button>
      <Button variant="filled">Contact Support</Button>
    </div>
  </div>
);

const ComingSoonCard = ({
  title,
  description,
  buttonText,
  iconColor = 'blue'
}: {
  title: string;
  description: string;
  buttonText: string;
  iconColor?: 'blue' | 'green';
}) => (
  <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
    <div
      className={`mb-6 rounded-full ${iconColor === 'blue' ? 'bg-blue-100' : 'bg-green-100'} p-4`}
    >
      <Search className={`h-8 w-8 ${iconColor === 'blue' ? 'text-blue-500' : 'text-green-500'}`} />
    </div>
    <h3 className="text-gray-900 mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-gray-600 mb-6 max-w-md">{description}</p>
    <Button variant="filled">{buttonText}</Button>
  </div>
);

const LoadMoreButton = ({
  onClick,
  isLoading,
  hasMore,
  currentCount,
  totalItems
}: {
  onClick: () => void;
  isLoading: boolean;
  hasMore: boolean;
  currentCount: number;
  totalItems: number;
}) => {
  // Don't show anything if no data loaded yet
  if (currentCount === 0) {
    return null;
  }

  return (
    <div className="py-8 text-center">
      {hasMore ? (
        <div className="space-y-4">
          <Button
            variant="outlined"
            onClick={onClick}
            disabled={isLoading}
            className="relative mx-auto max-w-[250px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading more...
              </>
            ) : (
              `Load More (${currentCount} loaded)`
            )}
          </Button>

          {/* Additional loading indicator */}
          {isLoading && (
            <div className="text-blue-600 flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Fetching more results...</span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">
          {totalItems > 0 && totalItems !== currentCount
            ? `Showing all ${currentCount} of ${totalItems} results`
            : `Showing ${currentCount} results`}
        </p>
      )}
    </div>
  );
};

const LabTestContent = () => {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'lab-tests');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const labTestsQuery = useLabTestsWithLoadMore(
    activeTab === 'lab-tests' ? debouncedSearchQuery : undefined,
    activeTab === 'lab-tests'
  );

  const packageTestsQuery = usePackageTestsWithLoadMore(
    activeTab === 'package-tests' ? debouncedSearchQuery : undefined,
    activeTab === 'package-tests'
  );

  const molecularTestsQuery = useMolecularTestsWithLoadMore(
    activeTab === 'molecular-tests' ? debouncedSearchQuery : undefined,
    activeTab === 'molecular-tests'
  );

  const imagingTestsQuery = useAdvancedImagingTestsWithLoadMore(
    activeTab === 'imaging-tests' ? debouncedSearchQuery : undefined,
    activeTab === 'imaging-tests'
  );

  const getCurrentQuery = () => {
    switch (activeTab) {
      case 'lab-tests':
        return labTestsQuery;
      case 'package-tests':
        return packageTestsQuery;
      case 'molecular-tests':
        return molecularTestsQuery;
      case 'imaging-tests':
        return imagingTestsQuery;
      default:
        return labTestsQuery;
    }
  };

  const currentQuery = getCurrentQuery();
  const { data, isLoading, isLoadingMore, error, loadMore, hasMore, currentCount, totalItems } =
    currentQuery;

  const tabHeading = (tab: string) => {
    switch (tab) {
      case 'lab-tests':
        return 'Laboratory & Diagnostic Tests';
      case 'package-tests':
        return 'All Package Tests';
      case 'imaging-tests':
        return 'Advanced Imaging Tests';
      case 'molecular-tests':
        return 'Molecular Tests';
      default:
        return 'Laboratory Tests';
    }
  };

  const getTestType = (tab: string) => {
    switch (tab) {
      case 'lab-tests':
        return 'lab tests';
      case 'package-tests':
        return 'package tests';
      case 'imaging-tests':
        return 'imaging tests';
      case 'molecular-tests':
        return 'molecular tests';
      default:
        return 'tests';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="bg-gradient-to-br from-blue-400 to-blue-400 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {tabHeading(activeTab)}
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-blue-100">
              Discover our comprehensive range of {getTestType(activeTab)} and diagnostic services
              for accurate health assessment and early disease detection.
            </p>

            <div className="relative mx-auto mb-8 max-w-2xl">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="text-gray-400 h-6 w-6" />
                </div>
                <input
                  type="text"
                  className="text-gray-900 placeholder:text-gray-500 block w-full rounded-full border-none bg-white/95 py-4 pl-12 pr-4 text-lg shadow-lg backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/30"
                  placeholder="Search for tests, conditions, or symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3">
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">
                  {isLoading ? (
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  ) : (
                    `${totalItems || 0}+`
                  )}
                </div>
                <div className="text-sm text-blue-100">{getTestType(activeTab)} available</div>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-blue-100">Support</div>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">Fast</div>
                <div className="text-sm text-blue-100">Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8 flex w-full flex-col shadow-blue-400/30 lg:flex-row lg:items-center lg:justify-between">
            <TabsList className=" mb-4 hidden h-fit w-full flex-wrap gap-2 rounded-xl border bg-white p-4 shadow-sm lg:mb-0">
              <TabsTrigger
                value="lab-tests"
                className="text-md rounded-lg px-6 py-3 font-semibold transition-all data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Individual Tests
              </TabsTrigger>
              <TabsTrigger
                value="package-tests"
                className="text-md rounded-lg px-6 py-3 font-semibold transition-all data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Test Packages
              </TabsTrigger>
              <TabsTrigger
                value="imaging-tests"
                className="text-md rounded-lg px-6 py-3 font-semibold transition-all data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Advanced Imaging
              </TabsTrigger>
              <TabsTrigger
                value="molecular-tests"
                className="text-md rounded-lg px-6 py-3 font-semibold transition-all data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Molecular Diagnostics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Lab Tests Tab */}
          <TabsContent value="lab-tests" className="mt-0">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-gray-900 mb-3 text-2xl font-bold sm:text-3xl">
                Individual Laboratory Tests
              </h2>
              <p className="text-gray-600 max-w-3xl text-lg">
                Choose from our comprehensive range of individual diagnostic tests. Each test
                includes professional analysis and detailed results interpretation.
              </p>
            </div>

            {isLoading ? (
              <LoadingState type="individual" />
            ) : error ? (
              <div className="py-8 text-center">
                <p className="text-red-600">Error loading tests. Please try again.</p>
              </div>
            ) : !data?.length ? (
              <NoResults searchQuery={debouncedSearchQuery} testType="lab tests" />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map((test: any) => (
                    <TestCard key={test.id} test={test} />
                  ))}

                  {/* Show skeleton cards when loading more */}
                  {isLoadingMore && (
                    <>
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                    </>
                  )}
                </div>

                <LoadMoreButton
                  onClick={loadMore}
                  isLoading={isLoadingMore}
                  hasMore={hasMore}
                  currentCount={currentCount}
                  totalItems={totalItems}
                />
              </>
            )}
          </TabsContent>

          {/* Package Tests Tab */}
          <TabsContent value="package-tests" className="mt-0">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-gray-900 mb-3 text-2xl font-bold sm:text-3xl">
                Comprehensive Test Packages
              </h2>
              <p className="text-gray-600 max-w-3xl text-lg">
                Our specially curated test packages offer comprehensive health assessment with
                multiple tests at exceptional value for complete health insights.
              </p>
            </div>

            {isLoading ? (
              <LoadingState type="package" />
            ) : error ? (
              <div className="py-8 text-center">
                <p className="text-red-600">Error loading package tests. Please try again.</p>
              </div>
            ) : !data?.length ? (
              <NoResults searchQuery={debouncedSearchQuery} testType="package tests" />
            ) : (
              <>
                <div className="space-y-8">
                  {data.map((test: any) => (
                    <PackageTestCard key={test.id} test={test} />
                  ))}

                  {/* Show skeleton cards when loading more */}
                  {isLoadingMore && (
                    <>
                      <PackageTestSkeleton />
                      <PackageTestSkeleton />
                      <PackageTestSkeleton />
                      <PackageTestSkeleton />
                      <PackageTestSkeleton />
                    </>
                  )}
                </div>

                <LoadMoreButton
                  onClick={loadMore}
                  isLoading={isLoadingMore}
                  hasMore={hasMore}
                  currentCount={currentCount}
                  totalItems={totalItems}
                />
              </>
            )}
          </TabsContent>

          {/* Molecular Tests Tab */}
          <TabsContent value="molecular-tests" className="mt-0">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-gray-900 mb-3 text-2xl font-bold sm:text-3xl">
                Molecular Diagnostics
              </h2>
              <p className="text-gray-600  text-lg">
                Molecular diagnostics using polymerase chain reaction (PCR) technologies are at the
                forefront of modern disease detection. These methods identify pathogens by analyzing
                their genetic material, allowing for early and accurate diagnosis. <br />
                <span className="font-semibold text-blue-200">
                  Reverse Transcription PCR (RT-PCR)
                </span>{' '}
                remains the gold standard for detecting and monitoring viral and rare infections due
                to its exceptional sensitivity and precision. <br />
                <span className="font-semibold text-blue-200">
                  Loop-Mediated Isothermal Amplification (LAMP PCR)
                </span>{' '}
                offers a rapid, accessible alternative, enabling DNA amplification at a constant
                temperature and eliminating the need for complex laboratory equipment. <br />
                <br />
                <span className="block pb-3 pt-3 font-bold">Our Expertise</span>
                Our molecular diagnostics team focuses on identifying hard-to-diagnose viral,
                bacterial, and protozoan infections. Using both RT-PCR and LAMP PCR platforms, we
                support accurate diagnosis and monitor treatment effectiveness to guide clinical
                decisions.
                <span className="block pb-3 pt-3 font-bold">
                  Innovation for Resource-Limited Settings
                </span>
                We are committed to expanding diagnostic access through the development of
                point-of-care LAMP testing kits designed specifically for resource-limited
                environments. Our goal is to improve early detection, deliver reliable results where
                they are needed most, and strengthen global health outcomes.
              </p>
            </div>

            {isLoading ? (
              <LoadingState type="individual" />
            ) : error ? (
              <div className="py-8 text-center">
                <p className="text-red-600">Error loading molecular tests. Please try again.</p>
              </div>
            ) : !data?.length ? (
              debouncedSearchQuery ? (
                <NoResults searchQuery={debouncedSearchQuery} testType="molecular tests" />
              ) : !isLoading && totalItems === 0 ? (
                <ComingSoonCard
                  title="Molecular Diagnostics"
                  description="Advanced molecular testing services coming soon. Get notified when they're available."
                  buttonText="Get Notified"
                  iconColor="green"
                />
              ) : null
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map((test: any) => (
                    <TestCard key={test.id} test={test} />
                  ))}
                </div>

                <LoadMoreButton
                  onClick={loadMore}
                  isLoading={isLoadingMore}
                  hasMore={hasMore}
                  currentCount={currentCount}
                  totalItems={totalItems}
                />
              </>
            )}
          </TabsContent>

          {/* Advanced Imaging Tab */}
          <TabsContent value="imaging-tests" className="mt-0">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-gray-900 mb-3 text-2xl font-bold sm:text-3xl">
                Advanced Imaging Services
              </h2>
              <p className="text-gray-600  text-lg">
                Diagnostic imaging uses non-invasive technologies to visualize internal structures
                and physiological processes, supporting accurate diagnosis, early detection, and
                ongoing monitoring of medical conditions. Our services currently include{' '}
                <span className="font-semibold text-blue-200">ultrasound</span> and{' '}
                <span className="font-semibold text-blue-200">ocular</span> imaging, delivered with
                a focus on accessibility, accuracy, and patient comfort.
                <br />
                <span className="block pb-3 pt-3 font-bold">At-Home Ultrasound</span>
                With high-definition portable ultrasound systems, we provide essential diagnostic
                imaging directly in patients’ homes—an invaluable service for pregnant women,
                elderly individuals, and anyone with mobility challenges. Our technicians ensure a
                safe, comfortable, and professional experience while delivering clinically reliable
                imaging results.
                <span className="block pb-3 pt-3 font-bold">At-Home Ocular Imaging</span>
                Our at-home ocular imaging services help detect and monitor conditions such as{' '}
                <span className="font-semibold text-blue-200">
                  glaucoma, diabetic retinopathy, macular changes, and other chronic eye diseases.
                </span>{' '}
                By bringing advanced eye-health technology to the patient, we improve accessibility
                and support early interventions that protect long-term vision.
              </p>
            </div>

            {isLoading ? (
              <LoadingState type="individual" />
            ) : error ? (
              <div className="py-8 text-center">
                <p className="text-red-600">Error loading imaging tests. Please try again.</p>
              </div>
            ) : !data?.length ? (
              debouncedSearchQuery ? (
                <NoResults searchQuery={debouncedSearchQuery} testType="imaging tests" />
              ) : !isLoading && totalItems === 0 ? (
                <ComingSoonCard
                  title="Advanced Imaging Services"
                  description="Our advanced imaging services are currently being set up. Contact us for immediate imaging needs."
                  buttonText="Contact for Imaging Services"
                  iconColor="blue"
                />
              ) : null
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map((test: any) => (
                    <TestCard key={test.id} test={test} />
                  ))}
                </div>

                <LoadMoreButton
                  onClick={loadMore}
                  isLoading={isLoadingMore}
                  hasMore={hasMore}
                  currentCount={currentCount}
                  totalItems={totalItems}
                />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <div className="to-indigo-50 bg-gradient-to-r from-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-gray-900 mb-6 text-3xl font-bold sm:text-4xl">
              Need Help Choosing the Right Test?
            </h2>
            <p className="text-gray-600 mb-8 text-xl leading-relaxed">
              Our team of medical experts and certified laboratory professionals are ready to assist
              you in selecting the most appropriate tests for your specific health concerns and
              medical history.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:mb-8 lg:gap-6">
              <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                <div className="text-blue-600 mb-1.5 text-2xl font-bold sm:mb-2 lg:text-3xl">
                  24/7
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Expert Support Available</div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                <div className="text-green-600 mb-1.5 text-2xl font-bold sm:mb-2 lg:text-3xl">
                  Free
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Initial Consultation</div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm sm:col-span-2 sm:p-5 md:col-span-1 lg:p-6">
                <div className="text-purple-600 mb-1.5 text-2xl font-bold sm:mb-2 lg:text-3xl">
                  Fast
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Test Results</div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 md:space-x-6">
              <Button
                variant="filled"
                className="w-full rounded-md px-4 py-3 text-base font-semibold sm:w-auto md:px-6 md:py-3.5 lg:px-8 lg:py-4 lg:text-lg"
              >
                Book Free Consultation
              </Button>
              <Button
                variant="outlined"
                className="text-blue-600 w-full rounded-md border-blue-400 px-4 py-3 text-base font-semibold hover:bg-blue-50 sm:w-auto md:px-6 md:py-3.5 lg:px-8 lg:py-4 lg:text-lg"
                onClick={() => router.push(ROUTES.CONTACT_US.path)}
              >
                Contact Our Experts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LabTestView = () => {
  return (
    <Suspense fallback={<LabTestViewFallback />}>
      <LabTestContent />
    </Suspense>
  );
};

export default LabTestView;
