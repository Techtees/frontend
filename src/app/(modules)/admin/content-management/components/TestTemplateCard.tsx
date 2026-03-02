import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';

interface ITestTemplateCardProps {
  template: TAdminTestTemplateItem;
}

const TestTemplateCard = ({ template }: ITestTemplateCardProps) => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const templateTestId = template.testId || template.test?.id;
  const templateName =
    template.test?.name || template.testName || template.testId || 'Test Template';

  return (
    <Card className="w-full shadow-none">
      <CardHeader className="pb-2">
        <div className="flex w-full items-center justify-between">
          <CardTitle>{templateName}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  if (!templateTestId) return;
                  toggleModals({
                    name: AppModals.ADMIN_TEST_TEMPLATE,
                    open: true,
                    testId: templateTestId,
                    mode: 'edit'
                  });
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (!templateTestId) return;
                  toggleModals({
                    name: AppModals.DEL_TEST_TEMPLATE_MODAL,
                    open: true,
                    id: templateTestId
                  });
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {template.parameters?.length > 0 ? (
          <div className="grid gap-2">
            {template.parameters.map((parameter, index) => (
              <div
                key={`${parameter.name}-${index}`}
                className="rounded-lg border border-neutral-100 p-3"
              >
                <div className="text-sm font-medium text-neutral-800">{parameter.name}</div>
                <div className="text-sm text-neutral-500">
                  Unit: {parameter.measurement_unit || parameter.measurementUnit}
                </div>
                <div className="text-sm text-neutral-500">
                  Range: {parameter.reference_range || parameter.referenceRange}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">No parameters added yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default observer(TestTemplateCard);
