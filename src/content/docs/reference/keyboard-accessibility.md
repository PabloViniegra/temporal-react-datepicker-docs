---
title: Keyboard & Accessibility
description: Keyboard navigation reference and accessibility features.
---

## Keyboard navigation

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

- `role="grid"` on the calendar with `role="columnheader"` / `role="gridcell"` per cell.
- Full `aria-label` on every day button (e.g. `"Monday, March 17, 2026"`).
- Range days include context suffixes: `", range start"`, `", range end"`, `", in range"` (customizable via `labels`).
- Today is marked with `aria-current="date"`.
- Selected dates use `aria-selected="true"`.
- Disabled days use the native `disabled` attribute (not keyboard-focusable).
- Panel switches announced via `aria-live="polite"`.
- All interactive elements expose `:focus-visible` styles.
