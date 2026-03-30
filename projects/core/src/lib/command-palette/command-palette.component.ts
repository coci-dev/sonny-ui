import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { SnyInputDirective } from '../input/input.directive';
import { SNY_DIALOG_DATA } from '../modal/dialog.service';
import type { Command, CommandGroup, CommandPaletteConfig } from './command-palette.types';

@Component({
  selector: 'sny-command-palette',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SnyInputDirective],
  host: {
    '(keydown)': 'onKeydown($event)',
    'class': 'block',
  },
  styles: `
    :host {
      display: block;
      background-color: var(--sny-background);
      border: 1px solid var(--sny-border);
      border-radius: 0.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
    }
  `,
  template: `
    <!-- Search -->
    <div class="flex items-center gap-2 border-b border-border px-4 py-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input
        #searchInput
        snyInput
        class="border-none shadow-none h-8 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        [placeholder]="config.placeholder ?? 'Type a command...'"
        [value]="query()"
        (input)="onQueryChange(searchInput.value)"
      />
      <kbd class="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground shrink-0">Esc</kbd>
    </div>

    <!-- Results -->
    <div class="max-h-[300px] overflow-y-auto p-2 sny-scrollbar">
      @if (flatResults().length === 0) {
        <p class="py-6 text-center text-sm text-muted-foreground">
          {{ config.emptyText ?? 'No results found.' }}
        </p>
      } @else {
        @for (group of filteredGroups(); track group.name) {
          @if (group.name) {
            <p class="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{{ group.name }}</p>
          }
          @for (cmd of group.commands; track cmd.id) {
            @let idx = flatIndex(cmd);
            <button
              [attr.data-cmd-idx]="idx"
              [class]="
                'w-full text-left rounded-sm px-3 py-2 text-sm transition-colors flex items-center gap-3 cursor-pointer ' +
                (idx === activeIndex()
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground hover:bg-accent/50')
              "
              (click)="execute(cmd)"
              (mouseenter)="activeIndex.set(idx)"
            >
              @if (cmd.icon) {
                <span class="shrink-0 w-5 text-center text-muted-foreground" [innerHTML]="cmd.icon"></span>
              }
              <div class="flex-1 min-w-0">
                <span class="block truncate font-medium">{{ cmd.label }}</span>
                @if (cmd.description) {
                  <span class="block text-xs text-muted-foreground truncate">{{ cmd.description }}</span>
                }
              </div>
              @if (cmd.shortcut) {
                <kbd class="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground shrink-0">{{ cmd.shortcut }}</kbd>
              }
            </button>
          }
        }
      }
    </div>

    <!-- Footer -->
    <div class="border-t border-border px-4 py-2">
      <div class="flex items-center gap-3 text-xs text-muted-foreground">
        <span class="flex items-center gap-1">
          <kbd class="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">&uarr;&darr;</kbd>
          Navigate
        </span>
        <span class="flex items-center gap-1">
          <kbd class="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">&crarr;</kbd>
          Execute
        </span>
        <span class="flex items-center gap-1">
          <kbd class="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">Esc</kbd>
          Close
        </span>
      </div>
    </div>
  `,
})
export class SnyCommandPaletteComponent {
  readonly config = inject<CommandPaletteConfig>(SNY_DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef);
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly query = signal('');
  readonly activeIndex = signal(0);

  readonly filteredGroups = computed<CommandGroup[]>(() => {
    const q = this.query().toLowerCase().trim();
    const commands = this.config.commands.filter((cmd) => {
      if (cmd.disabled) return false;
      if (!q) return true;
      return (
        cmd.label.toLowerCase().includes(q) ||
        cmd.description?.toLowerCase().includes(q) ||
        cmd.keywords?.some((k) => k.toLowerCase().includes(q))
      );
    });

    const groups = new Map<string, Command[]>();
    for (const cmd of commands) {
      const group = cmd.group ?? '';
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group)!.push(cmd);
    }

    return [...groups.entries()].map(([name, cmds]) => ({ name, commands: cmds }));
  });

  readonly flatResults = computed(() =>
    this.filteredGroups().flatMap((g) => g.commands)
  );

  constructor() {
    afterNextRender(() => {
      this.searchInput()?.nativeElement.focus();
    });
  }

  onQueryChange(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  flatIndex(cmd: Command): number {
    return this.flatResults().indexOf(cmd);
  }

  execute(cmd: Command): void {
    this.dialogRef.close();
    cmd.action();
  }

  onKeydown(event: KeyboardEvent): void {
    const results = this.flatResults();
    const len = results.length;
    if (len === 0 && event.key !== 'Escape') return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update((i) => (i + 1) % len);
        this.scrollActiveIntoView();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update((i) => (i - 1 + len) % len);
        this.scrollActiveIntoView();
        break;
      case 'Enter':
        event.preventDefault();
        const active = results[this.activeIndex()];
        if (active) this.execute(active);
        break;
    }
  }

  private scrollActiveIntoView(): void {
    requestAnimationFrame(() => {
      const el = document.querySelector(`[data-cmd-idx="${this.activeIndex()}"]`);
      el?.scrollIntoView({ block: 'nearest' });
    });
  }
}
