import { useStore } from '@/store';
import React, { useState } from 'react';
import Button from '@/atoms/Buttons';
import { Package, Star, Eye, MessageCircle, CheckCircle, Users } from 'lucide-react';
import TestDetailsDialog from '../../home/components/tests/TestDetailsDialog';
import { observer } from 'mobx-react-lite';

export interface PackageTestCardProps {
  test: PackageTest;
}

const PackageTestCard = ({ test }: PackageTestCardProps) => {
  const {
    CartStore: { addItem, isInCart, removeItem }
  } = useStore();

  const [selectedTest, setSelectedTest] = useState<PackageTest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = () => {
    setSelectedTest(test);
    setIsDialogOpen(true);
  };

  const handleAddToCartFromModal = (test: PackageTest | any, type: 'single' | 'package') => {
    addItem(test, type);
  };

  const handleRequestQuote = () => {
    window.location.href = `/contact?package=${encodeURIComponent(test.name)}`;
  };

  return (
    <>
      <div className="border-gray-100 group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-lg lg:flex-row">
        <div className="flex flex-1 flex-col">
          <div className="group-hover:from-blue-600 group-hover:to-blue-700 space-y-4 bg-gradient-to-br from-blue-300 to-blue-400 p-6 text-white transition-colors sm:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <span className="flex w-fit items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-200">
                <Package size={16} className="mr-2" />
                Package Test
              </span>

              <div className="flex items-center gap-2">
                <span className="flex w-fit items-center rounded-lg bg-neutral-400 px-4 py-2 text-sm font-semibold text-white">
                  <Star size={16} className="mr-2" />
                  Best Value
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold leading-tight sm:text-2xl">{test.name}</h3>
            <p className="text-sm leading-relaxed text-blue-100 sm:text-base">{test.description}</p>

            <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-300" />
                <span className="text-sm font-semibold">Package Benefits</span>
              </div>
              <div className="text-sm text-blue-100">
                {test.tests?.length || 0} comprehensive tests • Expert analysis • Cost savings
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-6 sm:flex-row">
            <Button
              variant="filled"
              className="flex flex-1 items-center justify-center text-sm font-medium transition-transform hover:scale-105"
              onClick={handleViewDetails}
            >
              <Eye size={16} className="mr-2" />
              View Details & Pricing
            </Button>
          </div>

          <div className="border-gray-100 border-t px-6 pb-4 pt-3 text-center">
            <p className="text-gray-500 text-xs">
              💡 <span className="font-medium">Package benefits:</span> Comprehensive testing with
              significant savings
            </p>
          </div>

          {isInCart(test.id) && (
            <div className="text-green-600 bg-green-50 mx-6 mb-4 flex items-center justify-center rounded-lg border border-green-200 py-3 text-sm font-medium">
              <CheckCircle size={16} className="mr-2" />
              Package added to your cart
            </div>
          )}
        </div>

        {test.tests && test.tests.length > 0 && (
          <div className="border-gray-100 from-gray-50 flex-1 border-t bg-gradient-to-b to-white p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-blue-600 flex items-center text-lg font-bold">
                <Package size={20} className="mr-2" />
                Included Tests
              </h4>
              <span className="text-blue-800 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-semibold">
                {test.tests.length} tests
              </span>
            </div>

            <div className="space-y-5">
              {test.tests.slice(0, 4).map((subtest, index) => (
                <div key={index} className="group/item">
                  <h5 className="text-gray-900 group-hover/item:text-blue-700 mb-2 font-semibold transition-colors">
                    {subtest.name}
                  </h5>
                  <div className="relative pl-4">
                    <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                    <p className="text-gray-600 text-sm leading-relaxed">{subtest.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {test.tests.length > 4 && (
              <div className="border-gray-200 mt-6 border-t pt-4 text-center">
                <p className="text-blue-600 mb-1 text-sm font-semibold">
                  + {test.tests.length - 4} more tests included
                </p>
                <p className="text-gray-500 text-xs">
                  View complete details to see all included tests
                </p>
              </div>
            )}

            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
              <div className="mb-2 flex items-center">
                <Users size={16} className="text-blue-600 mr-2" />
                <span className="text-blue-900 text-sm font-semibold">
                  Why Choose This Package?
                </span>
              </div>
              <ul className="text-blue-800 space-y-1 text-xs">
                <li>• Comprehensive health assessment</li>
                <li>• Significant cost savings vs individual tests</li>
                <li>• Single appointment convenience</li>
                <li>• Integrated health insights</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <TestDetailsDialog
        test={selectedTest}
        testType="package"
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddToCart={handleAddToCartFromModal}
        isInCart={selectedTest ? isInCart(selectedTest.id) : false}
      />
    </>
  );
};

export default observer(PackageTestCard);
