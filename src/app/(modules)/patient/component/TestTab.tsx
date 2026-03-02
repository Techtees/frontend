'use client';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import { useLabTestsWithLoadMore, usePackageTestsWithLoadMore } from '@/hooks/patient/useTest';
import Spinner from '@/lib/utils/spinner';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft, Loader2 } from 'lucide-react';
import { Toast } from '@/atoms/Toast';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import TestCard from '../test/available/component/TestCard';
import TestDetailView from '../test/available/component/TestDetailView';
import CartSummary from '../test/available/component/CartSummary';

interface TestSelectionPanelProps {
  onClose: () => void;
  confirmButtonText?: string;
  hideHeader?: boolean;
  hideCartSummary?: boolean;
}

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
    <div className="py-4 text-center">
      {hasMore ? (
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={onClick}
            disabled={isLoading}
            className="relative mx-auto"
            size="sm"
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
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="text-xs">Fetching more results...</span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          {totalItems > 0 && totalItems !== currentCount
            ? `Showing all ${currentCount} of ${totalItems} results`
            : `Showing ${currentCount} results`}
        </p>
      )}
    </div>
  );
};

const TestSelectionPanel = observer(
  ({
    onClose,
    confirmButtonText = 'Confirm Selection',
    hideHeader = false,
    hideCartSummary = false
  }: TestSelectionPanelProps) => {
    const {
      CartStore: { isInCart, addItem, removeItem }
    } = useStore();

    // States
    const [activeTab, setActiveTab] = useState('single');
    const [detailView, setDetailView] = useState(false);
    const [selectedTest, setSelectedTest] = useState<SingleTest | PackageTest | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Use the new hooks with load more functionality
    const singleTestsQuery = useLabTestsWithLoadMore(
      activeTab === 'single' ? searchTerm : undefined,
      activeTab === 'single'
    );

    const packageTestsQuery = usePackageTestsWithLoadMore(
      activeTab === 'package' ? searchTerm : undefined,
      activeTab === 'package'
    );

    const handleSearch = (term: string) => {
      setSearchTerm(term);
    };

    const handleViewDetails = (test: SingleTest | PackageTest) => {
      setSelectedTest(test);
      setDetailView(true);
    };

    const handleAddToCart = (test: SingleTest | PackageTest) => {
      const isPackage = 'tests' in test;

      try {
        addItem(test, isPackage ? 'package' : 'single');
        Toast.success(`Added ${test.name} to your selection`);
      } catch (error) {
        Toast.error('Failed to add test to selection');
      }
    };

    const handleRemoveFromCart = (id: string, name: string) => {
      try {
        removeItem(id);
        Toast.success(`Removed ${name} from your selection`);
      } catch (error) {
        Toast.error('Failed to remove test from selection');
      }
    };

    // Only show full page spinner on initial load (no data and not searching)
    if (
      activeTab === 'single' &&
      singleTestsQuery.isLoading &&
      singleTestsQuery.currentCount === 0 &&
      !searchTerm
    ) {
      return (
        <div className="flex h-full w-full items-center justify-center p-8">
          <Spinner />
        </div>
      );
    }

    if (
      activeTab === 'package' &&
      packageTestsQuery.isLoading &&
      packageTestsQuery.currentCount === 0 &&
      !searchTerm
    ) {
      return (
        <div className="flex h-full w-full items-center justify-center p-8">
          <Spinner />
        </div>
      );
    }

    if (detailView && selectedTest) {
      return (
        <TestDetailView
          test={selectedTest}
          onBack={() => setDetailView(false)}
          onAddToCart={() => handleAddToCart(selectedTest)}
          onRemoveFromCart={() => handleRemoveFromCart(selectedTest.id, selectedTest.name)}
          hideCartSummary={hideCartSummary}
        />
      );
    }

    return (
      <div className="flex h-full flex-col">
        {hideHeader && (
          <div className="flex items-center justify-between border-b bg-white p-4">
            <h2 className="text-xl font-semibold">Select Tests</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white p-3 shadow-sm">
            <TabsList>
              <TabsTrigger value="single">Single Tests</TabsTrigger>
              <TabsTrigger value="package">Package Tests</TabsTrigger>
            </TabsList>
            <InputSearch
              className="!w-[calc(70%-80px)]"
              placeholder="Search for tests..."
              onSearch={handleSearch}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <TabsContent value="single" className="mt-0 space-y-2">
              {singleTestsQuery.isLoading && singleTestsQuery.currentCount === 0 ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="text-blue-600 h-6 w-6 animate-spin" />
                  <span className="text-gray-600 ml-2 text-sm">Loading tests...</span>
                </div>
              ) : singleTestsQuery.data.length === 0 ? (
                <EmptySearchResults searchTerm={searchTerm} />
              ) : (
                <>
                  {singleTestsQuery.data.map((test) => (
                    <TestCard
                      key={test.id}
                      test={test}
                      onView={() => handleViewDetails(test)}
                      onAdd={() => handleAddToCart(test)}
                      onRemove={() => handleRemoveFromCart(test.id, test.name)}
                      isInCart={isInCart(test.id)}
                    />
                  ))}

                  <LoadMoreButton
                    onClick={singleTestsQuery.loadMore}
                    isLoading={singleTestsQuery.isLoadingMore}
                    hasMore={singleTestsQuery.hasMore}
                    currentCount={singleTestsQuery.currentCount}
                    totalItems={singleTestsQuery.totalItems}
                  />
                </>
              )}
            </TabsContent>

            <TabsContent value="package" className="mt-0 space-y-2">
              {packageTestsQuery.isLoading && packageTestsQuery.currentCount === 0 ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="text-blue-600 h-6 w-6 animate-spin" />
                  <span className="text-gray-600 ml-2 text-sm">Loading packages...</span>
                </div>
              ) : packageTestsQuery.data.length === 0 ? (
                <EmptySearchResults searchTerm={searchTerm} />
              ) : (
                <>
                  {packageTestsQuery.data.map((test) => (
                    <TestCard
                      key={test.id}
                      test={test}
                      isPackage
                      onView={() => handleViewDetails(test)}
                      onAdd={() => handleAddToCart(test)}
                      onRemove={() => handleRemoveFromCart(test.id, test.name)}
                      isInCart={isInCart(test.id)}
                    />
                  ))}

                  <LoadMoreButton
                    onClick={packageTestsQuery.loadMore}
                    isLoading={packageTestsQuery.isLoadingMore}
                    hasMore={packageTestsQuery.hasMore}
                    currentCount={packageTestsQuery.currentCount}
                    totalItems={packageTestsQuery.totalItems}
                  />
                </>
              )}
            </TabsContent>
          </div>
        </Tabs>

        {!hideCartSummary && (
          <CartSummary
            onClose={onClose}
            onRemoveItem={handleRemoveFromCart}
            confirmButtonText={confirmButtonText}
          />
        )}
      </div>
    );
  }
);

// Empty search results component
const EmptySearchResults = ({ searchTerm }: { searchTerm: string }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <Search className="text-gray-400 mb-2 h-10 w-10" />
    <p className="text-gray-500">No tests found matching &quot;{searchTerm}&quot;</p>
  </div>
);

export default TestSelectionPanel;
