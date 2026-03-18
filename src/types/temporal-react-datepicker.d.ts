import type { Temporal } from '@js-temporal/polyfill';
import type { ReactNode } from 'react';

declare module 'temporal-react-datepicker' {
  interface DateRange {
    start: Temporal.PlainDate;
    end: Temporal.PlainDate | null;
  }

  interface DayState {
    selected: boolean;
    inRange: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
  }

  interface SharedProps {
    isDateDisabled?: (date: Temporal.PlainDate) => boolean;
    showWeekNumbers?: boolean;
    className?: string;
    locale?: string;
    renderDayContent?: (date: Temporal.PlainDate, state: DayState) => ReactNode;
  }

  interface SingleProps extends SharedProps {
    mode?: 'single';
    clearable?: false;
    value: Temporal.PlainDate | undefined;
    onChange: (date: Temporal.PlainDate) => void;
  }

  interface SingleClearableProps extends SharedProps {
    mode?: 'single';
    clearable: true;
    value: Temporal.PlainDate | undefined;
    onChange: (date: Temporal.PlainDate | undefined) => void;
  }

  interface RangeProps extends SharedProps {
    mode: 'range';
    clearable?: false;
    value: DateRange | undefined;
    onChange: (range: DateRange) => void;
  }

  interface RangeClearableProps extends SharedProps {
    mode: 'range';
    clearable: true;
    value: DateRange | undefined;
    onChange: (range: DateRange | undefined) => void;
  }

  type TemporalDatePickerProps =
    | SingleProps
    | SingleClearableProps
    | RangeProps
    | RangeClearableProps;

  export function TemporalDatePicker(props: TemporalDatePickerProps): ReactNode;
  export type { DateRange, DayState };
}
