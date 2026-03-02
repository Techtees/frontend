'use client';

import Button from '@/atoms/Buttons';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Eye, MessageCircle, CheckCircle, Clock, ShoppingCart } from 'lucide-react';
import TestDetailsDialog from '../../home/components/tests/TestDetailsDialog';

export interface TestCardProps {
  test: SingleTest;
}

const TestCard = ({ test }: TestCardProps) => {
  const {
    CartStore: { addItem, isInCart, removeItem }
  } = useStore();

  const [selectedTest, setSelectedTest] = useState<SingleTest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = () => {
    setSelectedTest(test);
    setIsDialogOpen(true);
  };

  const handleAddToCartFromModal = (test: SingleTest | any, type: 'single' | 'package') => {
    addItem(test, type);
  };

  const handleRequestQuote = () => {
    window.location.href = `/contact?test=${encodeURIComponent(test.name)}`;
  };

  return (
    <>
      <div className="border-gray-100 group relative flex flex-col overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-blue-800 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold">
            {test.category?.replace('_', ' ') || 'Medical Test'}
          </span>

          <div className="text-green-600 flex items-center text-xs font-medium">
            <CheckCircle size={14} className="mr-1" />
            <span>Certified</span>
          </div>
        </div>

        <h3 className="text-gray-900 group-hover:text-blue-700 mb-3 text-lg font-semibold leading-tight transition-colors">
          {test.name}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
          {test.description}
        </p>

        <div className="text-gray-500 bg-gray-50 mb-4 flex items-center rounded-lg p-3 text-xs">
          <Clock size={14} className="text-blue-600 mr-2" />
          <span className="flex-1">
            Quick results • Professional analysis • Expert consultation
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="filled"
              className="flex flex-1 items-center justify-center text-sm font-medium transition-transform hover:scale-105"
              onClick={handleViewDetails}
            >
              <Eye size={16} className="mr-1" />
              View Details & Pricing
            </Button>
          </div>

          <div className="border-gray-100 border-t pt-2 text-center">
            <p className="text-gray-500 text-xs">
              💬 <span className="font-medium">Need guidance?</span> Our specialists are here to
              help
            </p>
          </div>
        </div>

        {isInCart(test.id) && (
          <div className="absolute right-3 top-3 rounded-full bg-green-500 p-2 text-white shadow-lg">
            <ShoppingCart size={14} />
          </div>
        )}

        {isInCart(test.id) && (
          <div className="text-green-600 bg-green-50 mt-3 flex items-center justify-center rounded-lg border border-green-200 py-2 text-sm font-medium">
            <CheckCircle size={14} className="mr-1" />
            Added to your cart
          </div>
        )}
      </div>

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

export default observer(TestCard);
