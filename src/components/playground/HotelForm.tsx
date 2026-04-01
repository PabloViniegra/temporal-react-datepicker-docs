import { useState } from 'react';
import { Temporal } from '@js-temporal/polyfill';
import { DatePickerInput } from 'temporal-react-datepicker';
import type { DateRange } from 'temporal-react-datepicker';
import '/node_modules/temporal-react-datepicker/dist/index.css';
import '../../styles/datepicker-theme.css';

const isPastDate = (d: Temporal.PlainDate) =>
  Temporal.PlainDate.compare(d, Temporal.Now.plainDateISO()) < 0;

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  dates: DateRange | undefined;
  guests: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = 'Required';
  if (!data.lastName.trim()) errors.lastName = 'Required';
  if (!data.email.trim()) {
    errors.email = 'Required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email address';
  }
  if (!data.dates) {
    errors.dates = 'Select check-in and check-out dates';
  } else if (!data.dates.end) {
    errors.dates = 'Select a check-out date';
  }
  return errors;
}

const INITIAL_FORM: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  dates: undefined,
  guests: '2',
};

export function HotelForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<object | null>(null);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      checkIn: form.dates!.start.toString(),
      checkOut: (form.dates!.end as Temporal.PlainDate).toString(),
      guests: Number(form.guests),
    });
  }

  function handleReset() {
    setSubmitted(null);
    setForm(INITIAL_FORM);
    setErrors({});
  }

  if (submitted) {
    return (
      <div className="pg-hotel__success">
        <div className="pg-hotel__success-title">
          <span className="pg-hotel__success-check" aria-hidden="true">✓</span>
          Booking submitted
        </div>
        <pre className="pg-output__value">{JSON.stringify(submitted, null, 2)}</pre>
        <button className="pg-hotel__reset" onClick={handleReset}>
          Reset form
        </button>
      </div>
    );
  }

  return (
    <div className="pg-hotel">
      <p className="pg-hotel__desc">
        Real-world example of <code>DatePickerInput</code> with <code>mode="range"</code>,{' '}
        <code>clearable</code>, and <code>isDateDisabled</code> (blocks past dates) inside a form.
      </p>

      <form onSubmit={handleSubmit} className="pg-hotel__form" noValidate>
        <div className="pg-hotel__row">
          <div className="pg-field">
            <label className="pg-field__label" htmlFor="hf-firstName">
              First name
            </label>
            <input
              id="hf-firstName"
              className={`pg-input${errors.firstName ? ' pg-input--error' : ''}`}
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              placeholder="John"
              autoComplete="given-name"
              maxLength={80}
            />
            {errors.firstName && <span className="pg-field__error">{errors.firstName}</span>}
          </div>

          <div className="pg-field">
            <label className="pg-field__label" htmlFor="hf-lastName">
              Last name
            </label>
            <input
              id="hf-lastName"
              className={`pg-input${errors.lastName ? ' pg-input--error' : ''}`}
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              placeholder="Doe"
              autoComplete="family-name"
              maxLength={80}
            />
            {errors.lastName && <span className="pg-field__error">{errors.lastName}</span>}
          </div>
        </div>

        <div className="pg-field">
          <label className="pg-field__label" htmlFor="hf-email">
            Email
          </label>
          <input
            id="hf-email"
            type="email"
            className={`pg-input${errors.email ? ' pg-input--error' : ''}`}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="john@example.com"
            autoComplete="email"
            maxLength={254}
          />
          {errors.email && <span className="pg-field__error">{errors.email}</span>}
        </div>

        <div className="pg-field">
          <div className="pg-field__label">Check-in / Check-out</div>
          <DatePickerInput
            mode="range"
            clearable
            value={form.dates}
            onChange={(dates) => update('dates', dates)}
            isDateDisabled={isPastDate}
            className="pg-datepicker-input"
          />
          {errors.dates && <span className="pg-field__error">{errors.dates}</span>}
        </div>

        <div className="pg-field">
          <label className="pg-field__label" htmlFor="hf-guests">
            Guests
          </label>
          <select
            id="hf-guests"
            className="pg-select pg-select--full"
            value={form.guests}
            onChange={(e) => update('guests', e.target.value)}
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} guest{n !== 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="pg-hotel__submit">
          Reserve
        </button>
      </form>
    </div>
  );
}
