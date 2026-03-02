import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import MultipleSelector, {
  MultipleSelectorProps,
  MultipleSelectorRef
} from '@/components/ui/multi-select';
import { forwardRef } from 'react';

interface IInputMultiSelectProps extends MultipleSelectorProps {
  label: string;
  required?: boolean;
}

const InputMultiSelect = forwardRef<MultipleSelectorRef, IInputMultiSelectProps>(
  ({ label, ...props }, ref) => {
    return (
      <FormItem className="w-full">
        <FormLabel>{label}</FormLabel>
        <FormLabel>
          {label}
          {props.required && label != '' && <span className="text-red-300">*</span>}
        </FormLabel>
        <FormControl className="w-full">
          <MultipleSelector
            {...{ ref }}
            {...props}
            loadingIndicator={<p className="flex w-full items-center justify-center">loading</p>}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
);

InputMultiSelect.displayName = 'InputMultiSelect';
export default InputMultiSelect;
