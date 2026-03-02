'use client';

import Button from '@/atoms/Buttons';
import { Plus, Info, CheckCircle, Package, TestTube } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

interface TestDetailsDialogProps {
  test: SingleTest | PackageTest | null;
  testType: 'single' | 'package';
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (test: SingleTest | PackageTest, type: 'single' | 'package') => void;
  isInCart: boolean;
}

const TestDetailsDialog = ({
  test,
  testType,
  isOpen,
  onOpenChange,
  onAddToCart,
  isInCart
}: TestDetailsDialogProps) => {
  if (!test) return null;

  const discountAmount =
    test.discountedPrice && test.discountedPrice > 0 && test.discountedPrice < test.price
      ? test.price - test.discountedPrice
      : 0;

  const showDiscount = discountAmount > 0;

  const displayPrice =
    test?.discountedPrice === 0 || test.discountedPrice === undefined
      ? test.price
      : test.discountedPrice;

  const handleAddToCart = () => {
    onAddToCart(test, testType);
    // onOpenChange(false); //
  };

  const isPackageTest = (test: SingleTest | PackageTest): test is PackageTest => {
    return 'tests' in test;
  };

  const packageTest = isPackageTest(test) ? test : null;
  const singleTest = !isPackageTest(test) ? test : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <DialogTitle className="text-gray-900 text-2xl font-bold">{test.name}</DialogTitle>
            <span className="text-blue-800 flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium">
              {testType === 'package' ? (
                <>
                  <Package size={14} className="mr-1" />
                  Package Test
                </>
              ) : (
                <>
                  <TestTube size={14} className="mr-1" />
                  {test.category?.replace('_', ' ') || 'Single Test'}
                </>
              )}
            </span>
          </div>
          <DialogDescription className="text-gray-600">
            {testType === 'package'
              ? 'Complete package information with included tests and requirements'
              : 'Complete test information and requirements'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1 text-sm">
                  {testType === 'package' ? 'Package Price' : 'Test Price'}
                </p>
                <div className="flex items-center gap-3">
                  {showDiscount && (
                    <span className="text-gray-500 text-lg line-through">
                      ₦{test.price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-green-600 text-2xl font-bold">
                    ₦{displayPrice.toLocaleString()}
                  </span>
                  {showDiscount && (
                    <span className="rounded-full bg-green-500 px-2 py-1 text-sm text-white">
                      Save ₦{discountAmount.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                {showDiscount && (
                  <p className="text-green-600 text-sm font-medium">
                    {Math.round((discountAmount / test.price) * 100)}% OFF
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 mb-3 flex items-center text-lg font-semibold">
              <Info size={20} className="text-blue-500 mr-2" />
              Description
            </h4>
            <p className="text-gray-600 rounded-lg bg-blue-50 p-4 leading-relaxed">
              {test.description}
            </p>
          </div>

          {testType === 'package' && packageTest && packageTest.tests && (
            <div>
              <h4 className="text-gray-900 mb-3 flex items-center text-lg font-semibold">
                <Package size={20} className="mr-2 text-green-500" />
                Included Tests ({packageTest.tests.length})
              </h4>
              <div className="bg-green-50 space-y-4 rounded-lg border border-green-200 p-4">
                {packageTest.tests.map((includedTest, index) => (
                  <div
                    key={index}
                    className="border-b border-green-200 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                      <div className="flex-1">
                        <h5 className="text-gray-900 mb-1 font-semibold">{includedTest.name}</h5>
                        <p className="text-gray-600 text-sm">{includedTest.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {testType === 'single' &&
            singleTest &&
            singleTest.requirements &&
            singleTest.requirements.length > 0 && (
              <div>
                <h4 className="text-gray-900 mb-3 flex items-center text-lg font-semibold">
                  <CheckCircle size={20} className="mr-2 text-green-500" />
                  Test Requirements
                </h4>
                <div className="rounded-lg border border-green-200 bg-green-200 p-4">
                  <ul className="space-y-2">
                    {singleTest.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-300" />
                        <span className="text-neutral-700">{requirement.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-gray-900 mb-2 font-semibold">Test Type</h5>
              <p className="text-gray-600 capitalize">
                {testType === 'package'
                  ? `Package Test (${packageTest?.tests?.length || 0} tests included)`
                  : test.category?.toLowerCase().replace('_', ' ') || 'Standard Test'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-gray-900 mb-2 font-semibold">Status</h5>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                <span className="text-green-600 font-medium">Available</span>
              </div>
            </div>
          </div>

          {testType === 'package' && packageTest && packageTest.tests && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h5 className="text-blue-900 mb-2 font-semibold">Package Benefits</h5>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Comprehensive health screening in one package</li>
                <li>• Cost-effective compared to individual tests</li>
                <li>• Convenient single appointment for all tests</li>
                <li>• Complete health profile analysis</li>
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="flex space-x-3 pt-4">
          {!isInCart ? (
            <Button
              variant="filled"
              className="flex flex-1 items-center justify-center py-3 font-semibold"
              onClick={handleAddToCart}
            >
              <Plus size={18} className="mr-2" />
              Add to Cart - ₦{displayPrice.toLocaleString()}
            </Button>
          ) : (
            <Button
              variant="outlined"
              className="text-green-600 flex flex-1 items-center justify-center border-green-500 py-3 font-semibold"
              disabled
            >
              <CheckCircle size={18} className="mr-2" />
              Added to Cart
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TestDetailsDialog;
