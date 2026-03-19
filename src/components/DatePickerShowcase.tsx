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
      {/* Tab row */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '10px',
        }}
      >
        {TABS.map((tab) => {
          const isActive = mode === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => handleModeChange(tab.value)}
              style={{
                background: isActive ? '#18181b' : 'transparent',
                color: isActive ? '#fafafa' : '#71717a',
                border: '1px solid',
                borderColor: isActive ? '#27272a' : 'transparent',
                borderRadius: '6px',
                padding: '4px 12px',
                fontSize: '0.6875rem',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = '#71717a';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = '#71717a';
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Datepicker */}
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
