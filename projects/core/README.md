# @sonny-ui/core

Beautiful, accessible Angular components built with **Tailwind CSS v4** and **Signals**. Inspired by [shadcn/ui](https://ui.shadcn.com/).

- **Directive & Component-based** — lightweight directives for simple elements, full components for complex interactions
- **Signal inputs** — `input()`, `model()`, `output()`, `computed()`, `linkedSignal()` — pure Angular 21 signals API
- **Zoneless** — built for `provideZonelessChangeDetection()`
- **Themeable** — CSS custom properties with light, dark, and corporate themes
- **Accessible** — WAI-ARIA compliant, keyboard navigation, screen reader support
- **Reactive Forms** — ControlValueAccessor on all form components

## Installation

### Automatic (recommended)

```bash
ng add @sonny-ui/core
```

This installs the package, adds Tailwind CSS v4 if needed, imports `sonny-theme.css`, and provides `SonnyUI` in your app config.

### Manual

```bash
npm install @sonny-ui/core
```

Then in your `app.config.ts`:

```typescript
import { provideZonelessChangeDetection } from '@angular/core';
import { provideSonnyUI } from '@sonny-ui/core';

export const appConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideSonnyUI({ defaultTheme: 'light' }),
  ],
};
```

And import the theme in your global styles:

```css
@import "tailwindcss";
@import "@sonny-ui/core/styles/sonny-theme.css";
```

### Requirements

- Angular >= 21.0.0
- Angular CDK >= 21.0.0
- Tailwind CSS v4

## Components (55+)

### Layout & Navigation
| Component | Description |
|-----------|-------------|
| **Accordion** | Expandable sections, single/multi mode |
| **Breadcrumb** | Navigation trail with dynamic segments |
| **Navbar** | Responsive navigation bar with variants |
| **Tabs** | Tabbed content with triggers and panels |
| **Steps** | Step-by-step progress indicator |
| **Pagination** | Page navigation with sibling/boundary counts |
| **Divider** | Horizontal/vertical content separator |

### Data Display
| Component | Description |
|-----------|-------------|
| **Table** | Default/striped/bordered, 3 densities, sticky header |
| **Data Table** | Full-featured: sorting, filtering, pagination, row selection, expansion, column visibility, custom cell templates, bulk actions, loading skeleton, JSON export |
| **Card** | Content containers — 4 variants, selectable |
| **Badge** | Status labels — 6 variants, 3 sizes |
| **Avatar** | User images with fallback initials |
| **Stat** | Statistic display with label/value/change |
| **Timeline** | Chronological event display |
| **List** | Styled list items |
| **Kbd** | Keyboard shortcut display |
| **Status** | Status indicator dots |
| **Indicator** | Positioned badge indicators |
| **Diff** | Side-by-side content comparison |

### Form Controls
| Component | Description |
|-----------|-------------|
| **Input** | Text input — default/error/success variants |
| **Textarea** | Multi-line text input |
| **Select** | Dropdown selection with search |
| **Combobox** | Searchable dropdown with keyboard navigation |
| **Checkbox** | Signal-based with two-way binding |
| **Radio** | Signal-based radio groups |
| **Switch** | Toggle switches with two-way binding |
| **Slider** | Range input with min/max/step, drag support |
| **Toggle** | Pressed state buttons for toolbars |
| **Rating** | Star rating with half-star support |
| **File Input** | File upload with drag & drop |
| **Fieldset** | Grouped form fields with legend |
| **Calendar** | Date grid with single/range selection, hover preview |
| **Date Picker** | Single date with calendar dropdown, clearable, min/max |
| **Date Range Picker** | Date range with dual calendar, preset ranges, responsive |
| **Color Picker** | Visual color selector with saturation panel, hue slider, HEX/RGB/HSL, presets, favorites, EyeDropper API |
| **OTP Input** | One-time password input with auto-focus, paste, mask, separator, status feedback |
| **Validator** | Form validation message display |

### Feedback & Overlays
| Component | Description |
|-----------|-------------|
| **Alert** | Callout messages — 5 variants, dismissible |
| **Toast** | Notifications — 4 variants, positioned, with actions |
| **Modal / Dialog** | Dialog overlays using Angular CDK |
| **Sheet** | Slide-out panels from any side |
| **Drawer** | Bottom/side drawer panels |
| **Tooltip** | Hover/focus tooltips |
| **Dropdown Menu** | Context menus with items, separators, labels |
| **Command Palette** | Searchable command menu with groups, keyboard nav, service-based |

### Visual
| Component | Description |
|-----------|-------------|
| **Button** | 6 variants, 4 sizes, loading state, link mode |
| **Button Group** | Grouped actions, horizontal/vertical |
| **Loader** | Spinner, dots, and bars variants |
| **Skeleton** | Loading placeholders — line/circular/rounded |
| **Progress** | Linear progress bar |
| **Radial Progress** | Circular progress indicator |
| **Carousel** | Image/content slider |
| **Chat Bubble** | Message bubbles for chat UI |
| **Dock** | macOS-style dock with hover scaling |
| **FAB** | Floating action button |
| **Link** | Styled anchor with variants |

## Usage

```typescript
import { SnyButtonDirective, SnyCardDirective } from '@sonny-ui/core';

@Component({
  imports: [SnyButtonDirective, SnyCardDirective],
  template: `
    <div snyCard padding="md">
      <h3>My Card</h3>
      <button snyBtn variant="default">Click me</button>
      <button snyBtn variant="outline">Cancel</button>
    </div>
  `,
})
export class MyComponent {}
```

## Theming

Three built-in themes: **light**, **dark**, **corporate**. Toggle at runtime:

```typescript
import { ThemeService } from '@sonny-ui/core';

themeService = inject(ThemeService);
themeService.setTheme('dark');
```

CSS custom properties:

```css
--sny-background, --sny-foreground,
--sny-primary, --sny-primary-foreground,
--sny-secondary, --sny-secondary-foreground,
--sny-accent, --sny-accent-foreground,
--sny-muted, --sny-muted-foreground,
--sny-destructive, --sny-destructive-foreground,
--sny-border, --sny-ring, --sny-radius
```

## Links

- [Documentation](https://coci-dev.github.io/sonny-ui/)
- [GitHub](https://github.com/coci-dev/sonny-ui)
- [npm](https://www.npmjs.com/package/@sonny-ui/core)
- [Issues](https://github.com/coci-dev/sonny-ui/issues)

## License

MIT
