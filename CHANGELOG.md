# Changelog

All notable changes to SonnyUI are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0-alpha.13] - Unreleased

### Fixed

- **ControlValueAccessor async effect** — Replaced the `effect()` + `_writing` flag pattern with synchronous `_onChange()` calls in user interaction methods. The effect was firing after change detection, causing `NG0100: ExpressionChangedAfterItHasBeenCheckedError` and a one-cycle value lag in all 8 CVA components (switch, select, combobox, slider, rating, toggle, calendar, file-input).
- **Missing popover theme tokens** — Added `--sny-popover` and `--sny-popover-foreground` CSS variables to light, dark, and corporate themes. Dropdown backgrounds were transparent in dark mode.
- **Reactive forms code snippets** — Added missing `import { FormControl, ReactiveFormsModule }` to 7 doc pages (select, slider, rating, toggle, calendar, combobox, file-input).
- **Indicator variants** — Doc examples now use distinct positions (top-start, top-end, bottom-start, bottom-end) instead of all defaulting to top-end.
- **Tabs code snippet** — Updated to match the full preview with inputs, labels, and buttons instead of placeholder text.

### Added

- **Custom scrollbar** — `.sny-scrollbar` utility class with thin styled scrollbar that respects theme colors. Applied to select and combobox dropdown lists.
- **Button loading visual** — `loading` state now applies `opacity-70` + `cursor-wait` (distinct from `disabled` which uses `opacity-50`).
- **Dropdown interactive example** — Documentation now includes a signal-based "File" menu example that tracks the last selected action.
- **Copy-paste component list** — Documentation now shows all 50 available components and full `ng generate` usage with options.
- **Changelog page** — Added changelog to documentation site with i18n support.

## [0.1.0-alpha.12] - 2026-03-25

### Added

- Fix `provideSonnyUI` theme initialization and ng-add auto-configuration.
- Register all 50 components in ng-generate schematic.
- Add documentation pages and i18n for new components.
- Remove Playwright e2e setup.
