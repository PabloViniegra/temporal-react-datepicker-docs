import { useState, useEffect } from 'react';
import { Temporal } from '@js-temporal/polyfill';
import type { DateRange } from 'temporal-react-datepicker';
import { PropsPanel } from './PropsPanel';
import { LivePreview } from './LivePreview';
import { HotelForm } from './HotelForm';

export type IsDateDisabledPreset = 'none' | 'no-weekends' | 'past-dates' | 'future-dates';

export type PropConfig = {
  mode: 'single' | 'range';
  clearable: boolean;
  showWeekNumbers: boolean;
  locale: string;
  isDateDisabledPreset: IsDateDisabledPreset;
};

const DEFAULT_CONFIG: PropConfig = {
  mode: 'single',
  clearable: false,
  showWeekNumbers: false,
  locale: 'auto',
  isDateDisabledPreset: 'none',
};

type Tab = 'playground' | 'hotel';

const TABS: { id: Tab; label: string }[] = [
  { id: 'playground', label: 'Playground' },
  { id: 'hotel', label: 'Hotel Booking' },
];

function formatOutput(mode: 'single' | 'range', single: Temporal.PlainDate | undefined, range: DateRange | undefined): string {
  if (mode === 'single') {
    return single ? `"${single.toString()}"` : 'undefined';
  }
  if (!range) return 'undefined';
  return JSON.stringify(
    { start: range.start.toString(), end: range.end ? range.end.toString() : null },
    null,
    2
  );
}

export function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<Tab>('playground');
  const [propConfig, setPropConfig] = useState<PropConfig>(DEFAULT_CONFIG);
  const [singleValue, setSingleValue] = useState<Temporal.PlainDate | undefined>(undefined);
  const [rangeValue, setRangeValue] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    setSingleValue(undefined);
    setRangeValue(undefined);
  }, [propConfig.mode]);

  const outputValue = formatOutput(propConfig.mode, singleValue, rangeValue);

  return (
    <div className="not-content pg-root">
      {/* Tabs */}
      <div role="tablist" aria-label="Playground sections" className="pg-tabs">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            id={`pg-tab-${id}`}
            aria-controls={`pg-panel-${id}`}
            onClick={() => setActiveTab(id)}
            className={`pg-tab${activeTab === id ? ' pg-tab--active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'playground' ? (
        <div role="tabpanel" id="pg-panel-playground" aria-labelledby="pg-tab-playground">
          <div className="pg-split">
            <PropsPanel propConfig={propConfig} onChange={setPropConfig} />
            <LivePreview
              propConfig={propConfig}
              singleValue={singleValue}
              rangeValue={rangeValue}
              onSingleChange={setSingleValue}
              onRangeChange={setRangeValue}
            />
          </div>
          <div className="pg-output">
            <div className="pg-output__label" aria-hidden="true">onChange value</div>
            <pre className="pg-output__value" key={outputValue}>{outputValue}</pre>
          </div>
        </div>
      ) : (
        <div role="tabpanel" id="pg-panel-hotel" aria-labelledby="pg-tab-hotel">
          <HotelForm />
        </div>
      )}
    </div>
  );
}
