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
@import '@sonny-ui/core/src/styles/sonny-theme.css';
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
| **Avatar** | User images with fallback initials |
| **Badge** | Status labels — 6 variants, 3 sizes |
| **Breadcrumb** | Navigation trail with dynamic segments |
| **Button** | 6 variants, 4 sizes, loading state, link mode |
| **Button Group** | Grouped actions, horizontal/vertical |
| **Card** | Content containers — 4 variants, selectable |
| **Checkbox** | Signal-based with two-way binding |
| **Combobox** | Searchable dropdown with keyboard navigation |
| **Input** | Text input — default/error/success variants |
| **Loader** | Spinner, dots, and bars variants |
| **Modal** | Dialog overlays using Angular CDK |
| **Radio** | Signal-based radio groups |
| **Select** | Dropdown selection with options array |
| **Sheet** | Slide-out panels from any side |
| **Skeleton** | Loading placeholders — line/circular/rounded |
| **Slider** | Range input with min/max/step |
| **Switch** | Toggle switches with two-way binding |
| **Table** | Default/striped/bordered, 3 densities, sticky header |
| **Tabs** | Tabbed content with triggers and panels |
| **Toast** | Notifications — 4 variants, positioned, with actions |
| **Toggle** | Pressed state buttons for toolbars |

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
