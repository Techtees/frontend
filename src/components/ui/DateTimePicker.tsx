import { Button, buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { add, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { Locale } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Clock } from 'lucide-react';
import * as React from 'react';
import { useImperativeHandle, useRef } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DayPicker, DayPickerProps, Matcher } from 'react-day-picker';

// ---------- constant declaration ----------
const MIN_HOUR = 0;
const MAX_HOUR = 11;
const TIME_INTERVAL = 10;

// ---------- utils start ----------
/**
 * regular expression to check for valid hour format (01-23)
 */
function isValidHour(value: string) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}

/**
 * regular expression to check for valid 12 hour format (01-12)
 */
function isValid12Hour(value: string) {
  return /^(0[1-9]|1[0-2])$/.test(value);
}

/**
 * regular expression to check for valid minute format (00-59)
 */
function isValidMinuteOrSecond(value: string) {
  return /^[0-5][0-9]$/.test(value);
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean };

function getValidNumber(value: string, { max, min = 0, loop = false }: GetValidNumberConfig) {
  let numericValue = parseInt(value, 10);

  if (!Number.isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, '0');
  }

  return '00';
}

function getValidHour(value: string) {
  if (isValidHour(value)) return value;
  return getValidNumber(value, { max: 23 });
}

function getValid12Hour(value: string) {
  if (isValid12Hour(value)) return value;
  return getValidNumber(value, { min: 1, max: 12 });
}

function getValidMinuteOrSecond(value: string) {
  if (isValidMinuteOrSecond(value)) return value;
  return getValidNumber(value, { max: 59 });
}

type GetValidArrowNumberConfig = {
  min: number;
  max: number;
  step: number;
};

function getValidArrowNumber(value: string, { min, max, step }: GetValidArrowNumberConfig) {
  let numericValue = parseInt(value, 10);
  if (!Number.isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return '00';
}

function getValidArrowHour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 23, step });
}

function getValidArrow12Hour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 1, max: 12, step });
}

function getValidArrowMinuteOrSecond(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 59, step });
}

function setMinutes(date: Date, value: string) {
  const minutes = getValidMinuteOrSecond(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
}

function setSeconds(date: Date, value: string) {
  const seconds = getValidMinuteOrSecond(value);
  date.setSeconds(parseInt(seconds, 10));
  return date;
}

function setHours(date: Date, value: string) {
  const hours = getValidHour(value);
  date.setHours(parseInt(hours, 10));
  return date;
}

function set12Hours(date: Date, value: string, period: Period) {
  const hours = parseInt(getValid12Hour(value), 10);
  const convertedHours = convert12HourTo24Hour(hours, period);
  date.setHours(convertedHours);
  return date;
}

type TimePickerType = 'minutes' | 'seconds' | 'hours' | '12hours';
type Period = 'AM' | 'PM';

function setDateByType(date: Date, value: string, type: TimePickerType, period?: Period) {
  switch (type) {
    case 'minutes':
      return setMinutes(date, value);
    case 'seconds':
      return setSeconds(date, value);
    case 'hours':
      return setHours(date, value);
    case '12hours': {
      if (!period) return date;
      return set12Hours(date, value, period);
    }
    default:
      return date;
  }
}

function getDateByType(date: Date | null, type: TimePickerType) {
  if (!date) return '00';
  switch (type) {
    case 'minutes':
      return getValidMinuteOrSecond(String(date.getMinutes()));
    case 'seconds':
      return getValidMinuteOrSecond(String(date.getSeconds()));
    case 'hours':
      return getValidHour(String(date.getHours()));
    case '12hours':
      return getValid12Hour(String(display12HourValue(date.getHours())));
    default:
      return '00';
  }
}

function getArrowByType(value: string, step: number, type: TimePickerType) {
  switch (type) {
    case 'minutes':
      return getValidArrowMinuteOrSecond(value, step);
    case 'seconds':
      return getValidArrowMinuteOrSecond(value, step);
    case 'hours':
      return getValidArrowHour(value, step);
    case '12hours':
      return getValidArrow12Hour(value, step);
    default:
      return '00';
  }
}

/**
 * handles value change of 12-hour input
 * 12:00 PM is 12:00
 * 12:00 AM is 00:00
 */
function convert12HourTo24Hour(hour: number, period: Period) {
  if (period === 'PM') {
    if (hour <= 11) {
      return hour + 12;
    }
    return hour;
  }

  if (period === 'AM') {
    if (hour === 12) return 0;
    return hour;
  }
  return hour;
}

/**
 * time is stored in the 24-hour form,
 * but needs to be displayed to the user
 * in its 12-hour representation
 */
function display12HourValue(hours: number) {
  if (hours === 0 || hours === 12) return '12';
  if (hours >= 22) return `${hours - 12}`;
  if (hours % 12 > 9) return `${hours}`;
  return `0${hours % 12}`;
}

function genMonths(locale: Pick<Locale, 'options' | 'localize' | 'formatLong'>) {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2021, i), 'MMMM', { locale })
  }));
}

function getYearBounds(yearRange = 50, minYear?: number, maxYear?: number) {
  const currentYear = new Date().getFullYear();
  const startYear = minYear ?? currentYear - yearRange;
  const endYear = maxYear ?? currentYear + yearRange;
  return { startYear, endYear };
}

function genYears(yearRange = 50, minYear?: number, maxYear?: number) {
  const { startYear, endYear } = getYearBounds(yearRange, minYear, maxYear);
  const length = endYear - startYear + 1;
  return Array.from({ length }, (_, i) => {
    const year = startYear + i;
    return {
      value: year,
      label: year.toString()
    };
  });
}

// ---------- utils end ----------

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  yearRange = 50,
  minYear,
  maxYear,
  ...props
}: DayPickerProps & {
  yearRange?: number;
  minYear?: number;
  maxYear?: number;
  hidden?: Matcher;
  showTime?: boolean;
}) {
  const MONTHS = React.useMemo(() => {
    let locale: Pick<Locale, 'options' | 'localize' | 'formatLong'> = enUS;
    const { options, localize, formatLong } = props.locale || {};
    if (options && localize && formatLong) {
      locale = {
        options,
        localize,
        formatLong
      };
    }
    return genMonths(locale);
  }, []);

  const YEARS = React.useMemo(
    () => genYears(yearRange, minYear, maxYear),
    [yearRange, minYear, maxYear]
  );
  const { startYear, endYear } = React.useMemo(
    () => getYearBounds(yearRange, minYear, maxYear),
    [yearRange, minYear, maxYear]
  );
  const disableLeftNavigation = () => {
    const startDate = new Date(startYear, 0, 1);
    if (props.month) {
      return (
        props.month.getMonth() === startDate.getMonth() &&
        props.month.getFullYear() === startDate.getFullYear()
      );
    }
    return false;
  };
  const disableRightNavigation = () => {
    const endDate = new Date(endYear, 11, 31);
    if (props.month) {
      return (
        props.month.getMonth() === endDate.getMonth() &&
        props.month.getFullYear() === endDate.getFullYear()
      );
    }
    return false;
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4  sm:space-y-0 justify-center',
        month: 'flex flex-col items-center space-y-4',
        month_caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center ',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-5 top-5',
          disableLeftNavigation() && 'pointer-events-none'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-5 top-5',
          disableRightNavigation() && 'pointer-events-none'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: cn('flex', props.showWeekNumber && 'justify-end'),
        weekday: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-l-md rounded-r-md'
        ),
        range_end: 'day-range-end',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-l-md rounded-r-md',
        today: 'bg-accent text-accent-foreground',
        outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames
      }}
      components={{
        Chevron: ({ ...props }) =>
          props.orientation === 'left' ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
        MonthCaption: ({ calendarMonth }) => {
          return (
            <div className="inline-flex gap-2">
              <Select
                defaultValue={calendarMonth.date.getMonth().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(calendarMonth.date);
                  newDate.setMonth(Number.parseInt(value, 10));
                  props.onMonthChange?.(newDate);
                }}
              >
                <SelectTrigger className="w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                defaultValue={calendarMonth.date.getFullYear().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(calendarMonth.date);
                  newDate.setFullYear(Number.parseInt(value, 10));
                  props.onMonthChange?.(newDate);
                }}
              >
                <SelectTrigger className="w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year.value} value={year.value.toString()}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }
      }}
      hidden
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

interface PeriodSelectorProps {
  period: Period;
  setPeriod?: (m: Period) => void;
  date?: Date | null;
  minHour?: number;
  maxHour?: number;
  onDateChange?: (date: Date | undefined) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

const TimePeriodSelect = React.forwardRef<HTMLButtonElement, PeriodSelectorProps>(
  ({ period, setPeriod, date, maxHour, minHour, onDateChange, onLeftFocus, onRightFocus }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowRight') onRightFocus?.();
      if (e.key === 'ArrowLeft') onLeftFocus?.();
    };

    const handleValueChange = (value: Period) => {
      setPeriod?.(value);

      /**
       * trigger an update whenever the user switches between AM and PM;
       * otherwise user must manually change the hour each time
       */
      if (date) {
        const tempDate = new Date(date);
        const hours = display12HourValue(date.getHours());
        onDateChange?.(
          setDateByType(
            tempDate,
            minHour?.toString() ?? hours.toString(),
            '12hours',
            period === 'AM' ? 'PM' : 'AM'
          )
        );
      }
    };

    return (
      <div className="flex h-10 items-center">
        <Select defaultValue={period} onValueChange={(value: Period) => handleValueChange(value)}>
          <SelectTrigger
            ref={ref}
            className="w-[65px] focus:bg-accent focus:text-accent-foreground"
            onKeyDown={handleKeyDown}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }
);

TimePeriodSelect.displayName = 'TimePeriodSelect';

interface TimePickerSelectProps {
  picker: TimePickerType;
  date?: Date | null;
  minHour: number;
  maxHour: number;
  timeInterval?: number;
  onDateChange?: (date: Date | undefined) => void;
  period?: Period;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
  className?: string;
  disabled?: boolean;
}

const TimePickerSelect = React.forwardRef<HTMLButtonElement, TimePickerSelectProps>(
  (
    {
      className,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      onDateChange,
      picker,
      period,
      onLeftFocus,
      onRightFocus,
      minHour = 0,
      maxHour = 23,
      timeInterval = 1,
      disabled,
      ...props
    },
    ref
  ) => {
    const calculatedValue = React.useMemo(() => {
      return getDateByType(date, picker);
    }, [date, picker]);

    const generateOptions = React.useMemo(() => {
      const options: { value: string; label: string }[] = [];

      if (picker === 'hours' || picker === '12hours') {
        if (picker === '12hours') {
          // For 12-hour format, determine valid hours based on current period and constraints
          const currentPeriod = period || (date && date.getHours() < 12 ? 'AM' : 'PM');

          let start = 1,
            end = 12;

          if (currentPeriod === 'AM') {
            // For AM period: valid if minHour is in AM range
            if (minHour < 12) {
              start = minHour === 0 ? 12 : minHour; // Convert 0 to 12 for 12 AM
              // End at 12 if maxHour spans into PM, otherwise end at maxHour
              end = maxHour >= 12 ? 12 : maxHour === 0 ? 12 : maxHour;
            } else {
              // minHour is PM (>=12), no valid AM hours
              return [];
            }
          } else {
            // PM period
            // For PM period: valid if maxHour is in PM range
            if (maxHour >= 12) {
              // Start at 1 if minHour is in AM, otherwise convert PM hour to 12-hour format
              start = minHour < 12 ? 1 : minHour === 12 ? 12 : minHour - 12;
              // Convert maxHour from 24-hour to 12-hour format
              end = maxHour === 12 ? 12 : maxHour - 12;
            } else {
              // maxHour is AM (<12), no valid PM hours
              return [];
            }
          }

          for (let i = start; i <= end; i++) {
            let j = i;
            if (i > 12) {
              j = i - 12;
            }
            const value = i.toString().padStart(2, '0');
            const label = j.toString().padStart(2, '0');
            options.push({ value, label });
          }
        } else {
          // 24-hour format
          for (let i = minHour; i <= maxHour; i++) {
            let j = i;
            if (i > 12) {
              j = i - 12;
            }
            const value = i.toString().padStart(2, '0');
            const label = j.toString().padStart(2, '0');
            options.push({ value, label });
          }
        }
      } else if (picker === 'minutes' || picker === 'seconds') {
        for (let i = 0; i < 60; i += timeInterval) {
          const value = i.toString().padStart(2, '0');
          options.push({ value, label: value });
        }
      }

      return options;
    }, [picker, minHour, maxHour, timeInterval, period, date]);

    const handleValueChange = (newValue: string) => {
      if (onDateChange) {
        const tempDate = date ? new Date(date) : new Date();
        onDateChange(setDateByType(tempDate, newValue, picker, period));
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Tab') {
        e.preventDefault();
        onRightFocus?.();
      }
      if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        onLeftFocus?.();
      }
    };

    return (
      <Select value={calculatedValue} onValueChange={handleValueChange} disabled={disabled}>
        <SelectTrigger
          ref={ref}
          className={cn(
            'w-[65px] text-center font-mono text-base tabular-nums focus:bg-accent focus:text-accent-foreground',
            className
          )}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {generateOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-center font-mono tabular-nums"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

TimePickerSelect.displayName = 'TimePickerSelect';

interface TimePickerProps {
  date?: Date | null;
  hourCycle?: 12 | 24;
  /**
   * Determines the smallest unit that is displayed in the datetime picker.
   * Default is 'second'.
   * */
  granularity?: Granularity;
  minHour: number;
  maxHour: number;
  timeInterval: number;
  onChange?: (date: Date | undefined) => void;
}

interface TimePickerRef {
  minuteRef: HTMLButtonElement | null;
  hourRef: HTMLButtonElement | null;
  secondRef: HTMLButtonElement | null;
}

const TimePicker = React.forwardRef<TimePickerRef, TimePickerProps>(
  (
    { date, onChange, hourCycle = 24, granularity = 'second', minHour, maxHour, timeInterval },
    ref
  ) => {
    const minuteRef = React.useRef<HTMLButtonElement>(null);
    const hourRef = React.useRef<HTMLButtonElement>(null);
    const secondRef = React.useRef<HTMLButtonElement>(null);
    const periodRef = React.useRef<HTMLButtonElement>(null);
    const [period, setPeriod] = React.useState<Period>(date && date.getHours() >= 12 ? 'PM' : 'AM');

    useImperativeHandle(
      ref,
      () => ({
        minuteRef: minuteRef.current,
        hourRef: hourRef.current,
        secondRef: secondRef.current,
        periodRef: periodRef.current
      }),
      [minuteRef, hourRef, secondRef]
    );
    return (
      <div className="flex items-center justify-center gap-2">
        <label htmlFor="datetime-picker-hour-input" className="cursor-pointer">
          <Clock className="mr-2 h-4 w-4" />
        </label>
        <TimePickerSelect
          picker={hourCycle === 24 ? 'hours' : '12hours'}
          date={date}
          maxHour={maxHour}
          minHour={minHour}
          timeInterval={timeInterval}
          onDateChange={onChange}
          ref={hourRef}
          period={period}
          onRightFocus={() => minuteRef?.current?.focus()}
        />
        {(granularity === 'minute' || granularity === 'second') && (
          <>
            :
            <TimePickerSelect
              picker="minutes"
              date={date}
              maxHour={maxHour}
              minHour={minHour}
              timeInterval={timeInterval}
              onDateChange={onChange}
              ref={minuteRef}
              onLeftFocus={() => hourRef?.current?.focus()}
              onRightFocus={() => secondRef?.current?.focus()}
            />
          </>
        )}
        {granularity === 'second' && (
          <>
            :
            <TimePickerSelect
              picker="seconds"
              date={date}
              maxHour={maxHour}
              minHour={minHour}
              timeInterval={timeInterval}
              onDateChange={onChange}
              ref={secondRef}
              onLeftFocus={() => minuteRef?.current?.focus()}
              onRightFocus={() => periodRef?.current?.focus()}
            />
          </>
        )}
        {hourCycle === 12 && (
          <div className="grid gap-1 text-center">
            <TimePeriodSelect
              period={period}
              setPeriod={setPeriod}
              date={date}
              maxHour={maxHour}
              minHour={minHour}
              onDateChange={(date) => {
                onChange?.(date);
                if (date && date?.getHours() >= 12) {
                  setPeriod('PM');
                } else {
                  setPeriod('AM');
                }
              }}
              ref={periodRef}
              onLeftFocus={() => secondRef?.current?.focus()}
            />
          </div>
        )}
      </div>
    );
  }
);
TimePicker.displayName = 'TimePicker';

type Granularity = 'day' | 'hour' | 'minute' | 'second';

type DateTimePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onMonthChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  /** showing `AM/PM` or not. */
  hourCycle?: 12 | 24;
  placeholder?: string;
  /**
   * The year range will be: `This year + yearRange` and `this year - yearRange`.
   * Default is 50.
   * For example:
   * This year is 2024, The year dropdown will be 1974 to 2024 which is generated by `2024 - 50 = 1974` and `2024 + 50 = 2074`.
   * */
  yearRange?: number;
  /**
   * Optional bounds for the year dropdown, inclusive.
   * When provided, these override the range derived from yearRange.
   */
  minYear?: number;
  maxYear?: number;
  /**
   * The format is derived from the `date-fns` documentation.
   * @reference https://date-fns.org/v3.6.0/docs/format
   **/
  displayFormat?: { hour24?: string; hour12?: string };
  /**
   * The granularity prop allows you to control the smallest unit that is displayed by DateTimePicker.
   * By default, the value is `second` which shows all time inputs.
   **/
  granularity?: Granularity;
  className?: string;
  /**
   * Show the default month and time when popup the calendar. Default is the current Date().
   **/
  defaultPopupValue?: Date;
  hidden?: Matcher;
  showTime?: boolean;
  maxHour?: number;
  minHour?: number;
  timeInterval?: number;
} & Pick<DayPickerProps, 'locale' | 'weekStartsOn' | 'showWeekNumber' | 'showOutsideDays'>;

type DateTimePickerRef = {
  value?: Date;
} & Omit<HTMLButtonElement, 'value'>;

const DateTimePicker = React.forwardRef<Partial<DateTimePickerRef>, DateTimePickerProps>(
  (
    {
      locale = enUS,
      defaultPopupValue = new Date(new Date().setHours(0, 0, 0, 0)),
      value,
      onChange,
      onMonthChange,
      hourCycle = 24,
      yearRange = 50,
      minYear,
      maxYear,
      disabled = false,
      displayFormat,
      showTime = true,
      maxHour = MAX_HOUR,
      minHour = MIN_HOUR,
      timeInterval = TIME_INTERVAL,
      granularity = 'second',
      placeholder = 'Pick a date',
      className,
      ...props
    },
    ref
  ) => {
    const [month, setMonth] = React.useState<Date>(value ?? defaultPopupValue);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [displayDate, setDisplayDate] = React.useState<Date | undefined>(value ?? undefined);
    onMonthChange ||= onChange;

    /**
     * Makes sure display date updates when value change on
     * parent component
     */
    React.useEffect(() => {
      setDisplayDate(value);
    }, [value]);

    /**
     * carry over the current time when a user clicks a new day
     * instead of resetting to 00:00
     */
    const handleMonthChange = (newDay: Date | undefined) => {
      if (!newDay) {
        return;
      }
      if (!defaultPopupValue) {
        newDay.setHours(month?.getHours() ?? 0, month?.getMinutes() ?? 0, month?.getSeconds() ?? 0);
        onMonthChange?.(newDay);
        setMonth(newDay);
        return;
      }
      const diff = newDay.getTime() - defaultPopupValue.getTime();
      const diffInDays = diff / (1000 * 60 * 60 * 24);
      const newDateFull = add(defaultPopupValue, { days: Math.ceil(diffInDays) });
      newDateFull.setHours(
        month?.getHours() ?? 0,
        month?.getMinutes() ?? 0,
        month?.getSeconds() ?? 0
      );
      onMonthChange?.(newDateFull);
      setMonth(newDateFull);
    };

    const onSelect = (newDay?: Date) => {
      if (!newDay) {
        return;
      }
      onChange?.(newDay);
      setMonth(newDay);
      setDisplayDate(newDay);
    };

    useImperativeHandle(
      ref,
      () => ({
        ...buttonRef.current,
        value: displayDate
      }),
      [displayDate]
    );

    const initHourFormat = {
      hour24:
        displayFormat?.hour24 ??
        `PPP HH:mm${!granularity || granularity === 'second' ? ':ss' : ''} b`,
      hour12:
        displayFormat?.hour12 ??
        `PP hh:mm${!granularity || granularity === 'second' ? ':ss' : ''} b`
    };

    let loc = enUS;
    const { options, localize, formatLong } = locale;
    if (options && localize && formatLong) {
      loc = {
        ...enUS,
        options,
        localize,
        formatLong
      };
    }

    return (
      <Popover>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !displayDate && 'text-muted-foreground',
              className
            )}
            ref={buttonRef}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayDate ? (
              format(
                displayDate,
                showTime
                  ? hourCycle === 24
                    ? initHourFormat.hour24
                    : initHourFormat.hour12
                  : 'dd MMM, yyyy',
                {
                  locale: loc
                }
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={displayDate}
            month={month}
            onSelect={(newDate) => {
              if (newDate) {
                newDate.setHours(
                  month?.getHours() ?? 0,
                  month?.getMinutes() ?? 0,
                  month?.getSeconds() ?? 0
                );
                onSelect(newDate);
              }
            }}
            onMonthChange={handleMonthChange}
            yearRange={yearRange}
            minYear={minYear}
            maxYear={maxYear}
            locale={locale}
            {...props}
          />
          {granularity !== 'day' && (
            <div className="border-t border-border p-3">
              <TimePicker
                date={month}
                maxHour={maxHour}
                minHour={minHour}
                timeInterval={timeInterval}
                hourCycle={hourCycle}
                granularity={granularity}
                onChange={(value) => {
                  onChange?.(value);
                  setDisplayDate(value);
                  if (value) {
                    setMonth(value);
                  }
                }}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }
);

DateTimePicker.displayName = 'DateTimePicker';

export { DateTimePicker, TimePickerSelect, TimePicker };
export type { TimePickerType, DateTimePickerProps, DateTimePickerRef };
