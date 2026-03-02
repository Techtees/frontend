'use client';
import { useFetchTestTemplates } from '@/hooks/labTech/useFetchTestTemplates';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, Loader2 } from 'lucide-react';
import { formatTestDate } from '@/utils/date';

const TestTemplatesView = () => {
  const { data: templates, isLoading } = useFetchTestTemplates();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg bg-white p-8">
        <FlaskConical className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">No Test Templates Found</h3>
        <p className="text-sm text-muted-foreground">
          There are no test templates available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="rounded-lg bg-white p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Test Templates</h1>
          <p className="text-sm text-muted-foreground">
            View all available test templates and their parameters
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {templates.map((template) => (
            <AccordionItem
              key={template.id}
              value={template.id}
              className="bg-gray-50 rounded-lg border px-4"
            >
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex w-full items-center justify-between pr-4">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <h3 className="font-semibold">{template.testName}</h3>
                      <p className="text-xs text-muted-foreground">
                        Created: {formatTestDate(template.createdAt)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-auto mr-4">
                    {template.parameters.length} Parameter
                    {template.parameters.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-4">
                {template.parameters.length > 0 ? (
                  <div className="rounded-md bg-white p-4">
                    <h4 className="text-gray-700 mb-3 text-sm font-semibold">Parameters</h4>
                    <div className="space-y-3">
                      {template.parameters.map((param) => (
                        <div
                          key={param.id}
                          className="border-gray-200 bg-gray-50 flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium">{param.name}</p>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Unit: </span>
                              <span className="text-gray-700 font-medium">
                                {param.measurementUnit}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Range: </span>
                              <span className="text-gray-700 font-medium">
                                {param.referenceRange}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No parameters defined</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default TestTemplatesView;
