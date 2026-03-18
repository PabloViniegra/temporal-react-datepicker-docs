import type { PropConfig, IsDateDisabledPreset } from './PlaygroundPage';

interface PropsPanelProps {
  propConfig: PropConfig;
  onChange: (config: PropConfig) => void;
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`pg-switch${checked ? ' pg-switch--on' : ''}`}
    >
      <span className="pg-switch__thumb" />
    </button>
  );
}

export function PropsPanel({ propConfig, onChange }: PropsPanelProps) {
  function update<K extends keyof PropConfig>(key: K, value: PropConfig[K]) {
    onChange({ ...propConfig, [key]: value });
  }

  return (
    <div className="pg-props">
      <div className="pg-props__heading">Props</div>

      {/* mode */}
      <div className="pg-prop">
        <div className="pg-prop__name">mode</div>
        <div className="pg-mode-toggle">
          {(['single', 'range'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => update('mode', m)}
              aria-pressed={propConfig.mode === m}
              className={`pg-mode-btn${propConfig.mode === m ? ' pg-mode-btn--active' : ''}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* clearable */}
      <div className="pg-prop">
        <div className="pg-prop__name">clearable</div>
        <div className="pg-prop__control">
          <Toggle
            checked={propConfig.clearable}
            onChange={(v) => update('clearable', v)}
            label="Toggle clearable"
          />
          <span className={`pg-prop__value${propConfig.clearable ? ' pg-prop__value--on' : ''}`}>{propConfig.clearable ? 'true' : 'false'}</span>
        </div>
      </div>

      {/* showWeekNumbers */}
      <div className="pg-prop">
        <div className="pg-prop__name">showWeekNumbers</div>
        <div className="pg-prop__control">
          <Toggle
            checked={propConfig.showWeekNumbers}
            onChange={(v) => update('showWeekNumbers', v)}
            label="Toggle showWeekNumbers"
          />
          <span className={`pg-prop__value${propConfig.showWeekNumbers ? ' pg-prop__value--on' : ''}`}>{propConfig.showWeekNumbers ? 'true' : 'false'}</span>
        </div>
      </div>

      {/* locale */}
      <div className="pg-prop">
        <div className="pg-prop__name">locale</div>
        <select
          className="pg-select"
          value={propConfig.locale}
          onChange={(e) => update('locale', e.target.value)}
          aria-label="locale"
        >
          <option value="auto">auto (navigator)</option>
          <option value="en-US">en-US</option>
          <option value="es-ES">es-ES</option>
          <option value="fr-FR">fr-FR</option>
          <option value="de-DE">de-DE</option>
          <option value="ja-JP">ja-JP</option>
        </select>
      </div>

      {/* isDateDisabled */}
      <div className="pg-prop">
        <div className="pg-prop__name">isDateDisabled</div>
        <select
          className="pg-select"
          value={propConfig.isDateDisabledPreset}
          onChange={(e) => update('isDateDisabledPreset', e.target.value as IsDateDisabledPreset)}
          aria-label="isDateDisabled preset"
        >
          <option value="none">none</option>
          <option value="no-weekends">no weekends</option>
          <option value="past-dates">past dates</option>
          <option value="future-dates">future dates</option>
        </select>
      </div>
    </div>
  );
}
