'use client';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useFetchTestTemplates } from '@/hooks/admin/useFetchTestTemplates';
import { Skeleton } from '@/components/ui/skeleton';
import EmptyState from '@/components/EmptyState';
import TestTemplateCard from './TestTemplateCard';

const TestTemplates = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  const { data, isLoading } = useFetchTestTemplates();
  const templates = data ?? [];

  return (
    <div className="flex h-[80vh] w-full flex-col space-y-4 overflow-y-scroll">
      <div className="flex justify-end">
        <Button
          className="w-fit bg-blue-400"
          onClick={() =>
            toggleModals({
              name: AppModals.ADMIN_TEST_TEMPLATE,
              open: true,
              testId: '',
              mode: 'create'
            })
          }
        >
          <PlusIcon /> Template
        </Button>
      </div>

      {isLoading &&
        Array(6)
          .fill(1)
          .map((_, id) => <Skeleton key={id} className="h-48 w-full" />)}

      {!isLoading &&
        templates.length > 0 &&
        templates.map((template, index) => (
          <TestTemplateCard
            key={template.testId || template.test?.id || `${template.testName}-${index}`}
            template={template}
          />
        ))}

      {!isLoading && templates.length === 0 && (
        <div className="h-3/4 w-full rounded-lg bg-white">
          <EmptyState title="No test templates yet." />
        </div>
      )}
    </div>
  );
};

export default TestTemplates;
