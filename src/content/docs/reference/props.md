---
title: Props
description: Complete API reference for all TemporalDatePicker props.
---

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
