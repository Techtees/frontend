'use client';

import Button from '@/atoms/Buttons';
import ServicesLoadingState from '@/atoms/Loaders/ServiceLoader';
import Spinner from '@/lib/utils/spinner';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { Toast } from '@/atoms/Toast';
import { observer } from 'mobx-react-lite';
import SingleTestLoader from '@/atoms/Loaders/SingleTestLoader';
import TestDetailsDialog from './TestDetailsDialog';
import { ShoppingCart, Eye, X, Plus, MessageCircle, Info, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface SingleTestProps {
  singleTest: SingleTest[];
  loading: boolean;
}

const SingleTestCard = ({ singleTest, loading }: SingleTestProps) => {
  const {
    CartStore: { addItem, clearCart, isInCart, removeItem }
  } = useStore();

  const router = useRouter();
  const [selectedTest, setSelectedTest] = useState<SingleTest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getDisplayPrice = (test: SingleTest) => {
    return test?.discountedPrice === 0 || test.discountedPrice === undefined
      ? test.price
      : test.discountedPrice;
  };

  const hasDiscount = (test: SingleTest) => {
    return test.discountedPrice && test.discountedPrice > 0 && test.discountedPrice < test.price;
  };

  const handleViewDetails = (test: SingleTest) => {
    setSelectedTest(test);
    setIsDialogOpen(true);
  };

  const handleRequestQuote = () => {
    router.push('/contact?request=quote');
  };

  const handleAddToCartFromModal = (test: SingleTest | any, type: 'single' | 'package') => {
    addItem(test, type);
  };

  return (
    <>
      {loading ? (
        <SingleTestLoader />
      ) : (
        singleTest.length !== 0 && (
          <>
            <div
              className="mt-4 grid grid-cols-1 gap-4 sm:gap-5  md:grid-cols-2 lg:grid-cols-3"
              id="lab-test"
            >
              {singleTest?.map((test, idx) => (
                <div
                  className="border-gray-100 group flex flex-col space-y-4 rounded-lg border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
                  key={idx}
                >
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-blue-800 rounded-full border border-blue-200 bg-blue-100 px-3 py-1.5 text-sm font-medium">
                      {test.category?.replace('_', ' ') || 'Medical Test'}
                    </span>
                  </div>

                  <h3 className="text-gray-900 group-hover:text-blue-700 text-lg font-semibold leading-tight transition-colors sm:text-xl">
                    {test.name}
                  </h3>

                  <p className="text-gray-600 line-clamp-3 flex-grow text-sm leading-relaxed sm:text-base">
                    {test.description}
                  </p>

                  <div className="text-gray-500 bg-gray-50 flex items-center rounded-md p-2 text-xs">
                    <CheckCircle size={14} className="text-green-600 mr-1" />
                    <span>Professional analysis • Quick results • Expert interpretation</span>
                  </div>

                  <div className="flex w-full space-x-3 pt-2">
                    <Button
                      variant="filled"
                      className="flex flex-1 items-center justify-center text-sm font-medium shadow-sm transition-transform duration-200 hover:scale-105"
                      onClick={() => handleViewDetails(test)}
                    >
                      <Info size={16} className="mr-1" />
                      View Details & Pricing
                    </Button>
                  </div>

                  <div className="border-gray-100 border-t pt-2 text-center">
                    <p className="text-gray-500 text-xs">
                      💬 <span className="font-medium">Need guidance?</span> Our specialists are
                      here to help
                    </p>
                  </div>

                  {isInCart(test.id) && (
                    <div className="text-green-600 bg-green-50 flex items-center justify-center rounded-md p-2 text-sm font-medium">
                      <ShoppingCart size={14} className="mr-1" />
                      Added to your cart
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex w-full justify-center sm:mt-10">
              <Button
                variant="filled"
                className="w-full max-w-md rounded-lg px-6 py-3 text-base font-semibold shadow-md transition-transform duration-200 hover:scale-105"
                onClick={() => router.push('/lab-test')}
              >
                Explore All Medical Tests
                <Eye size={18} className="ml-2" />
              </Button>
            </div>
          </>
        )
      )}

      {/* Test Details Dialog - This is where pricing is revealed */}
      <TestDetailsDialog
        test={selectedTest}
        testType="single"
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddToCart={handleAddToCartFromModal}
        isInCart={selectedTest ? isInCart(selectedTest.id) : false}
      />
    </>
  );
};

export default observer(SingleTestCard);
