import { Temporal } from '@js-temporal/polyfill';
import { TemporalDatePicker } from 'temporal-react-datepicker';
import type { DateRange } from 'temporal-react-datepicker';
import '/node_modules/temporal-react-datepicker/dist/index.css';
import '../../styles/datepicker-theme.css';
import type { PropConfig } from './PlaygroundPage';

interface LivePreviewProps {
  propConfig: PropConfig;
  singleValue: Temporal.PlainDate | undefined;
  rangeValue: DateRange | undefined;
  onSingleChange: (date: Temporal.PlainDate | undefined) => void;
  onRangeChange: (range: DateRange | undefined) => void;
}

function getIsDateDisabled(preset: PropConfig['isDateDisabledPreset']): ((date: Temporal.PlainDate) => boolean) | undefined {
  switch (preset) {
    case 'no-weekends':
      return (d) => d.dayOfWeek >= 6;
    case 'past-dates':
      return (d) => Temporal.PlainDate.compare(d, Temporal.Now.plainDateISO()) < 0;
    case 'future-dates':
      return (d) => Temporal.PlainDate.compare(d, Temporal.Now.plainDateISO()) > 0;
    default:
      return undefined;
  }
}

export function LivePreview({ propConfig, singleValue, rangeValue, onSingleChange, onRangeChange }: LivePreviewProps) {
  const locale = propConfig.locale === 'auto'
    ? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
    : propConfig.locale;

  const isDateDisabled = getIsDateDisabled(propConfig.isDateDisabledPreset);

  const shared = { showWeekNumbers: propConfig.showWeekNumbers, locale, isDateDisabled };

  return (
    <div className="pg-preview">
      {propConfig.mode === 'single' ? (
        propConfig.clearable ? (
          <TemporalDatePicker
            mode="single"
            clearable
            value={singleValue}
            onChange={onSingleChange}
            {...shared}
          />
        ) : (
          <TemporalDatePicker
            mode="single"
            value={singleValue}
            onChange={(d) => onSingleChange(d)}
            {...shared}
          />
        )
      ) : propConfig.clearable ? (
        <TemporalDatePicker
          mode="range"
          clearable
          value={rangeValue}
          onChange={onRangeChange}
          {...shared}
        />
      ) : (
        <TemporalDatePicker
          mode="range"
          value={rangeValue}
          onChange={(r) => onRangeChange(r)}
          {...shared}
        />
      )}
    </div>
  );
}
