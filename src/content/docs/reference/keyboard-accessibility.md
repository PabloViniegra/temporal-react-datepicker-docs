---
title: Keyboard & Accessibility
description: Keyboard navigation reference and accessibility features.
---

## Keyboard navigation

### DatePickerInput segments

| Key | Action |
|---|---|
| `↑` / `↓` | Increment / decrement the active segment. Day and month wrap around. |
| `Tab` / `Shift+Tab` | Move to the next / previous segment. |
| `0–9` | Type a value directly. Auto-advances when unambiguous (e.g. `5` on day → commits `05`, moves to month). |
| `Backspace` | Clear the active segment. |
| `Enter` / `Space` | Open the calendar popover. |
| `Escape` | Close the calendar popover. |

### Calendar grid

| Key | Action |
|---|---|
| `←` / `→` | Previous / next day |
| `↑` / `↓` | Same day, previous / next week |
| `Page Up` / `Page Down` | Previous / next month |
| `Home` | First day of the current week |
| `End` | Last day of the current week |
| `Enter` / `Space` | Select the focused date |
| `Tab` | Exit the calendar grid |

### Month and year panels

Click the **month name** or **year** in the calendar header to open the respective panel.

| Key | Action |
|---|---|
| `←` `→` `↑` `↓` | Navigate between items |
| `Enter` / `Space` | Confirm selection |
| `Escape` | Return to calendar without selecting |

## Accessibility features

### DatePickerInput

- Input wrapper: `role="group"`.
- Each segment: `role="spinbutton"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label` (`Day`, `Month`, `Year`).
- Icon trigger: `<button>` with `aria-label="Open calendar"` and `aria-expanded`.
- Popover: `role="dialog"` with `aria-modal="true"`.
- Focus moves into the calendar on open; returns to the trigger on close.

### TemporalDatePicker

- `role="grid"` on the calendar with `role="columnheader"` / `role="gridcell"` per cell.
- Full `aria-label` on every day button (e.g. `"Monday, March 17, 2026"`).
- Range days include context suffixes: `", range start"`, `", range end"`, `", in range"` (customizable via `labels`).
- Today is marked with `aria-current="date"`.
- Selected dates use `aria-selected="true"`.
- Disabled days use the native `disabled` attribute (not keyboard-focusable).
- Panel switches announced via `aria-live="polite"`.
- All interactive elements expose `:focus-visible` styles.
