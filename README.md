# @sonny-ui/core

Beautiful, accessible Angular components built with **Tailwind CSS v4** and **Signals**. Inspired by [shadcn/ui](https://ui.shadcn.com/).

- **Directive-based** — no wrapper components, applies directly to your elements
- **Signal inputs** — reactive state with Angular's signal system
- **Zoneless** — built for zoneless change detection
- **Themeable** — CSS custom properties with light/dark mode support
- **Accessible** — WAI-ARIA compliant interactive components

## Installation

### Automatic (recommended)

```bash
ng add @sonny-ui/core
```

This installs the package, adds Tailwind CSS v4 if needed, imports `sonny-theme.css`, and provides `SonnyUI` in your app config.

Options:
- `--project` — target project name
- `--theme` — theme to install (default: `light`)

### Manual

```bash
npm install @sonny-ui/core
```

Then in your `app.config.ts`:

```typescript
import { provideSonnyUI } from '@sonny-ui/core';

export const appConfig = {
  providers: [
    provideSonnyUI({ theme: 'light' }),
  ],
};
```

And import the theme in your global styles:

```css
@import '@sonny-ui/core/styles/sonny-theme.css';
```

### Requirements

- Angular >= 21.0.0
- Angular CDK >= 21.0.0
- Tailwind CSS v4

## Usage

```typescript
import { SnyButton } from '@sonny-ui/core';

@Component({
  imports: [SnyButton],
  template: `<button snyButton variant="primary" size="md">Click me</button>`,
})
export class MyComponent {}
```

## Components

| Component | Description |
|-----------|-------------|
| **Accordion** | Expandable sections, single/multi mode |
| **Alert** | Contextual feedback messages |
| **Avatar** | User images with fallback initials |
| **Avatar Group** | Stacked avatars with overflow counter |
| **Badge** | Status labels — 6 variants, 3 sizes |
| **Breadcrumb** | Navigation trail with dynamic segments |
| **Button** | 6 variants, 4 sizes, loading state, link mode |
| **Button Group** | Grouped actions, horizontal/vertical |
| **Calendar** | Date selection with single and range modes |
| **Card** | Content containers — 4 variants, selectable |
| **Carousel** | Slide-based content viewer |
| **Chat Bubble** | Chat message display |
| **Checkbox** | Signal-based with two-way binding |
| **Color Picker** | Color selection with HEX/RGB/HSL, EyeDropper API |
| **Combobox** | Searchable dropdown with keyboard navigation |
| **Command Palette** | Searchable command menu with keyboard navigation |
| **Data Table** | Sorting, filtering, pagination, selection, export, custom cells |
| **Date Picker** | Single date picker with calendar dropdown |
| **Date Range Picker** | Date range selection with presets |
| **Diff** | Side-by-side text diff viewer |
| **Divider** | Horizontal/vertical content separator |
| **Dock** | macOS-style dock navigation |
| **Drawer** | Slide-out panel overlay |
| **Dropdown** | Contextual menu with keyboard navigation |
| **FAB** | Floating action button |
| **Fieldset** | Grouped form fields with legend |
| **File Input** | File upload with drag & drop |
| **Indicator** | Notification dots/badges on elements |
| **Input** | Text input — default/error/success variants |
| **Kbd** | Keyboard shortcut display |
| **Link** | Styled anchor element |
| **List** | Structured list display |
| **Loader** | Spinner, dots, and bars variants |
| **Modal** | Dialog overlays using Angular CDK |
| **Navbar** | Responsive navigation bar |
| **Number Input** | Numeric stepper with +/- buttons |
| **OTP Input** | One-time password input with auto-focus |
| **Pagination** | Page navigation controls |
| **Popover** | Floating panel with trigger |
| **Progress** | Linear progress bar |
| **Radial Progress** | Circular progress indicator |
| **Radio** | Signal-based radio groups |
| **Rating** | Star rating input |
| **Select** | Dropdown selection with options array |
| **Sheet** | Slide-out panels from any side |
| **Skeleton** | Loading placeholders — line/circular/rounded |
| **Slider** | Range input with min/max/step |
| **Stat** | Statistic display with label and value |
| **Status** | Online/offline status indicator |
| **Steps** | Step-by-step progress indicator |
| **Switch** | Toggle switches with two-way binding |
| **Table** | Default/striped/bordered, 3 densities, sticky header |
| **Tabs** | Tabbed content with triggers and panels |
| **Tag Input** | Tag/chip input with validation |
| **Textarea** | Multi-line text input |
| **Timeline** | Chronological event display |
| **Toast** | Notifications — 4 variants, positioned, with actions |
| **Toggle** | Pressed state buttons for toolbars |
| **Tooltip** | Hover information popups |
| **Validator** | Form validation display |

## Theming

SonnyUI uses CSS custom properties for theming. Available tokens:

```css
--sny-background, --sny-foreground,
--sny-primary, --sny-primary-foreground,
--sny-secondary, --sny-secondary-foreground,
--sny-accent, --sny-accent-foreground,
--sny-muted, --sny-muted-foreground,
--sny-destructive, --sny-destructive-foreground,
--sny-border, --sny-ring, --sny-radius
```

Toggle themes at runtime with `ThemeService`:

```typescript
import { ThemeService } from '@sonny-ui/core';

themeService = inject(ThemeService);
themeService.setTheme('dark');
```

## Schematics

Generate components into your project:

```bash
ng generate @sonny-ui/core:component button
```

## Links

- [Documentation](https://coci-dev.github.io/sonny-ui/)
- [GitHub](https://github.com/coci-dev/sonny-ui)
- [Issues](https://github.com/coci-dev/sonny-ui/issues)

## License

MIT
