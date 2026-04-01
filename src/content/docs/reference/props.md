---
title: Props
description: Complete API reference for TemporalDatePicker and DatePickerInput props.
---

The library exports two components: `TemporalDatePicker` (standalone calendar) and `DatePickerInput` (segmented input field with popover). Both share the same core props.

## TemporalDatePicker

`TemporalDatePicker` uses a discriminated union — the available props depend on `mode` and `clearable`.

## Shared props

These props are available in all modes.

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `'single' \| 'range'` | `'single'` | Selection mode. |
| `clearable` | `boolean` | `false` | Show a `×` button to reset the selection when a value is set. |
| `isDateDisabled` | `(date: Temporal.PlainDate) => boolean` | `undefined` | Return `true` to disable a date. Disabled dates are not clickable or keyboard-focusable. In range mode, they also block range crossing. |
| `showWeekNumbers` | `boolean` | `false` | Show ISO week numbers as an extra column on the left. |
| `className` | `string` | `''` | Additional CSS class on the root element. |
| `locale` | `string` | `navigator.language` | BCP 47 locale tag controlling month names, weekday labels, and day `aria-label` strings. |
| `labels` | `Partial<Labels>` | English strings | Override any UI string. See [Internationalization](/guides/i18n/). |
| `renderDayContent` | `(date: Temporal.PlainDate, state: DayState) => ReactNode` | `undefined` | Custom renderer for each day cell. Falls back to the day number. |

## `mode="single"` props

| Prop | Type | Description |
|---|---|---|
| `value` | `Temporal.PlainDate \| undefined` | Currently selected date. |
| `onChange` | `(date: Temporal.PlainDate) => void` | Called when the user selects a date. |

When `clearable={true}`, `onChange` is widened to `(date: Temporal.PlainDate | undefined) => void`.

## `mode="range"` props

| Prop | Type | Description |
|---|---|---|
| `value` | `DateRange \| undefined` | Currently selected range. |
| `onChange` | `(range: DateRange) => void` | Called on each click. Fires with `end: null` after the first click, and with both dates set after the second. |

When `clearable={true}`, `onChange` is widened to `(range: DateRange | undefined) => void`.

## DatePickerInput

`DatePickerInput` accepts all `TemporalDatePicker` shared props plus the following:

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | `<CalendarIcon />` | Replace the default calendar icon with any element. |
| `iconPosition` | `'left' \| 'right'` | `'right'` | Position the icon before or after the segments. |
| `placeholder` | `string` | locale-derived (e.g. `dd/mm/aaaa`) | Placeholder hint shown when no value is set. |
| `disabled` | `boolean` | `false` | Disables all interaction. |
| `className` | `string` | `''` | Additional CSS class on the root element. |

See the [DatePickerInput guide](/guides/datepicker-input/) for usage examples.
