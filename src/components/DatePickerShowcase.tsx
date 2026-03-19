import { useState } from 'react';
import { Temporal } from '@js-temporal/polyfill';
import { TemporalDatePicker } from 'temporal-react-datepicker';
import type { DateRange } from 'temporal-react-datepicker';
import '/node_modules/temporal-react-datepicker/dist/index.css';
import '../styles/datepicker-theme.css';

const MODE = {
  SINGLE: 'single',
  RANGE: 'range',
} as const;

type Mode = (typeof MODE)[keyof typeof MODE];

const TABS: { label: string; value: Mode }[] = [
  { label: 'Single', value: MODE.SINGLE },
  { label: 'Range', value: MODE.RANGE },
];

export function DatePickerShowcase() {
  const [mode, setMode] = useState<Mode>(MODE.SINGLE);
  const [date, setDate] = useState<Temporal.PlainDate | undefined>(undefined);
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  function handleModeChange(next: Mode) {
    setMode(next);
    setDate(undefined);
    setRange(undefined);
  }

  return (
    <div>
      <div role="tablist" aria-label="Date picker mode" className="flex gap-1 mb-2.5">
        {TABS.map((tab) => {
          const isActive = mode === tab.value;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleModeChange(tab.value)}
              className={[
                'border rounded-[6px] px-3 py-1 text-[0.6875rem] font-mono',
                'cursor-pointer transition-colors duration-150',
                isActive
                  ? 'bg-[#18181b] text-[#fafafa] border-[#27272a] font-semibold'
                  : 'bg-transparent text-[#71717a] border-transparent hover:text-[#a1a1aa]',
              ].join(' ')}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {mode === MODE.SINGLE ? (
        <TemporalDatePicker
          mode="single"
          clearable
          value={date}
          onChange={setDate}
        />
      ) : (
        <TemporalDatePicker
          mode="range"
          clearable
          value={range}
          onChange={setRange}
        />
      )}
    </div>
  );
}
