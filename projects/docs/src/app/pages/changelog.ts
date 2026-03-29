import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../shared/code-block';
import {
  SnyBadgeDirective,
  SnyDividerComponent,
  SnyCardDirective,
  SnyCardContentDirective,
} from 'core';
import { I18nService } from '../i18n/i18n.service';
import { CHANGELOG_EN } from '../i18n/en/pages/changelog';
import { CHANGELOG_ES } from '../i18n/es/pages/changelog';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: { type: 'fix' | 'feat' | 'docs' | 'breaking'; description: string }[];
}

@Component({
  selector: 'docs-changelog',
  standalone: true,
  imports: [
    CodeBlockComponent,
    SnyBadgeDirective,
    SnyDividerComponent,
    SnyCardDirective,
    SnyCardContentDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().updateCommand }}</h2>
        <docs-code-block [code]="updateCode" language="bash" />
      </section>

      @for (entry of changelog; track entry.version) {
        <section class="space-y-4">
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-semibold">{{ entry.version }}</h2>
            <span class="text-sm text-muted-foreground">{{ entry.date }}</span>
          </div>
          <sny-divider />
          <div snyCard>
            <div snyCardContent class="p-4 space-y-3">
              @for (change of entry.changes; track change.description) {
                <div class="flex items-start gap-3">
                  <span snyBadge [variant]="badgeVariant(change.type)" size="sm" class="mt-0.5 shrink-0">
                    {{ change.type }}
                  </span>
                  <p class="text-sm text-foreground">{{ change.description }}</p>
                </div>
              }
            </div>
          </div>
        </section>
      }
    </div>
  `,
})
export class ChangelogComponent {
  private readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? CHANGELOG_ES : CHANGELOG_EN);

  updateCode = `npm update @sonny-ui/core`;

  badgeVariant(type: string): 'default' | 'destructive' | 'secondary' | 'outline' {
    switch (type) {
      case 'fix': return 'destructive';
      case 'feat': return 'default';
      case 'docs': return 'secondary';
      case 'breaking': return 'outline';
      default: return 'secondary';
    }
  }

  changelog: ChangelogEntry[] = [
    {
      version: 'v0.1.0-alpha.16 (next)',
      date: '2026-03-29',
      changes: [
        { type: 'feat', description: 'Add SnyColorPickerComponent with saturation/brightness panel, hue slider, HEX/RGB/HSL format switching, preset palettes, favorites, EyeDropper API, inline mode, and CVA support.' },
        { type: 'feat', description: 'Add SnyOtpInputComponent with auto-focus, clipboard paste, number/alphanumeric types, mask mode, visual separator, keyboard navigation (arrows, Home, End), autocomplete="one-time-code", and CVA support.' },
      ],
    },
    {
      version: 'v0.1.0-alpha.15',
      date: '2026-03-28',
      changes: [
        { type: 'feat', description: 'Add range selection mode to SnyCalendarComponent with visual highlighting, hover preview, and backwards-compatible mode input.' },
        { type: 'feat', description: 'Add SnyDatePickerComponent — single date picker with calendar dropdown, clearable, min/max constraints, and CVA support.' },
        { type: 'feat', description: 'Add SnyDateRangePickerComponent — date range picker with dual calendar option, preset ranges sidebar, and CVA support.' },
        { type: 'feat', description: 'Export DateRange, CalendarMode, DatePickerPreset types from calendar module.' },
      ],
    },
    {
      version: 'v0.1.0-alpha.14',
      date: '2026-03-27',
      changes: [
        { type: 'feat', description: 'Add SnyDataTableComponent with sorting, global filtering, pagination with page size selector, row selection, and JSON export.' },
        { type: 'feat', description: 'Add custom cell templates (SnyCellDefDirective) and custom header templates (SnyHeaderCellDefDirective) for rendering badges, buttons, and custom content in data-table cells.' },
        { type: 'feat', description: 'Add loading state with skeleton rows to data-table.' },
        { type: 'feat', description: 'Add bulk actions toolbar with content-projected action buttons when rows are selected.' },
        { type: 'feat', description: 'Add row expansion with custom detail content via SnyRowExpandDefDirective.' },
        { type: 'feat', description: 'Add column visibility toggle dropdown to data-table.' },
        { type: 'fix', description: 'Fix docs navbar responsive layout — hide burger on home, add mobile search button and SVG theme icons.' },
        { type: 'fix', description: 'Fix zoneless reactivity bug — convert sidebarOpen to signal for provideZonelessChangeDetection() compatibility.' },
        { type: 'fix', description: 'Fix locale switch URL generating trailing slash on home route causing layout mismatch.' },
      ],
    },
    {
      version: 'v0.1.0-alpha.13',
      date: '2026-03-26',
      changes: [
        { type: 'fix', description: 'Resolve ControlValueAccessor async effect causing value desync in reactive forms (NG0100). Affects: switch, select, combobox, slider, rating, toggle, calendar, file-input.' },
        { type: 'fix', description: 'Add missing --sny-popover and --sny-popover-foreground CSS variables to all themes. Dropdown backgrounds were transparent in dark mode.' },
        { type: 'feat', description: 'Add .sny-scrollbar utility class for styled scrollbars that respect theme colors.' },
        { type: 'feat', description: 'Button loading state now visually differs from disabled (opacity-70 + cursor-wait vs opacity-50).' },
        { type: 'docs', description: 'Fix missing import statements in reactive forms code snippets for 7 components.' },
        { type: 'docs', description: 'Add interactive signal-based example to dropdown menu documentation.' },
        { type: 'docs', description: 'Update tabs code snippet to match the full preview with inputs, labels, and buttons.' },
        { type: 'docs', description: 'Use distinct positions for indicator variant examples instead of all defaulting to top-end.' },
        { type: 'docs', description: 'Add available components list and ng generate usage to copy-paste page.' },
      ],
    },
    {
      version: 'v0.1.0-alpha.12',
      date: '2026-03-25',
      changes: [
        { type: 'feat', description: 'Fix provideSonnyUI theme initialization and ng-add auto-configuration.' },
        { type: 'feat', description: 'Register all 50 components in ng-generate schematic.' },
        { type: 'docs', description: 'Add documentation pages and i18n for new components.' },
      ],
    },
  ];
}
