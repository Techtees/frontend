import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useStore } from '@/store';
import { EnumAdminQueryType } from '@/store/AdminStore';
import { observer } from 'mobx-react-lite';

export const DataTableToolbar = observer(() => {
  const {
    AdminStore: { queries, applyQuery, resetQuery }
  } = useStore();

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue) {
        applyQuery(
          { search: searchValue } as Partial<TAdminPatientQuery>,
          EnumAdminQueryType.PATIENTS
        );
      } else {
        resetQuery(EnumAdminQueryType.PATIENTS);
      }
    }, 500); // Debounce search

    return () => clearTimeout(timer);
  }, [searchValue, applyQuery, resetQuery]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Search patients..."
          value={searchValue}
          onChange={handleSearchChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {searchValue && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearchValue('');
              resetQuery(EnumAdminQueryType.PATIENTS);
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
});

DataTableToolbar.displayName = 'DataTableToolbar';
