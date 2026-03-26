import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  model,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import { comboboxTriggerVariants, type ComboboxSize } from './combobox.variants';

export interface ComboboxOption {
  value: string;
  label: string;
}

@Component({
  selector: 'sny-combobox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative inline-block w-full',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyComboboxComponent), multi: true },
  ],
  template: `
    <!-- Trigger button -->
    <button
      #triggerEl
      type="button"
      role="combobox"
      [attr.aria-expanded]="open()"
      aria-haspopup="listbox"
      [class]="triggerClass()"
      (click)="toggle()"
      (blur)="onTouched()"
    >
      <span [class]="selectedLabel() ? '' : 'text-muted-foreground'">
        {{ selectedLabel() || placeholder() }}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 opacity-50"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>

    <!-- Dropdown popover -->
    @if (open()) {
      <div
        #dropdownEl
        class="fixed z-50 rounded-sm border border-border bg-popover text-popover-foreground shadow-md"
      >
        <!-- Search input -->
        <div class="flex items-center border-b border-border px-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 shrink-0 opacity-50"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            #searchEl
            type="text"
            class="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            [placeholder]="searchPlaceholder()"
            [value]="query()"
            (input)="onSearchInput($event)"
            (keydown)="onKeydown($event)"
          />
        </div>

        <!-- Options list -->
        @if (filtered().length > 0) {
          <ul role="listbox" class="max-h-60 overflow-auto p-1">
            @for (opt of filtered(); track opt.value; let i = $index) {
              <li
                role="option"
                [id]="'sny-cb-opt-' + opt.value"
                [attr.aria-selected]="value() === opt.value"
                [class]="optionClass(i)"
                (mousedown)="select(opt); $event.preventDefault()"
                (mouseenter)="activeIndex.set(i)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  [class]="value() === opt.value ? 'mr-2 shrink-0 opacity-100' : 'mr-2 shrink-0 opacity-0'"
                ><path d="M20 6 9 17l-5-5"/></svg>
                {{ opt.label }}
              </li>
            }
          </ul>
        } @else {
          <div class="py-6 text-center text-sm text-muted-foreground">No results found.</div>
        }
      </div>
    }
  `,
})
export class SnyComboboxComponent implements ControlValueAccessor, OnDestroy {
  readonly options = input<ComboboxOption[]>([]);
  readonly placeholder = input('Select...');
  readonly searchPlaceholder = input('Search...');
  readonly size = input<ComboboxSize>('md');
  readonly class = input<string>('');
  readonly value = model<string>('');

  readonly open = signal(false);
  readonly query = signal('');
  readonly activeIndex = signal(0);

  private readonly _disabledByCva = signal(false);

  private readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>('triggerEl');
  private readonly searchRef = viewChild<ElementRef<HTMLInputElement>>('searchEl');
  private readonly dropdownRef = viewChild<ElementRef<HTMLDivElement>>('dropdownEl');
  private readonly elRef = inject(ElementRef);

  private scrollHandler: (() => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  private _onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(val: string): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    this._disabledByCva.set(_isDisabled);
  }

  readonly selectedLabel = computed(() => {
    const v = this.value();
    if (!v) return '';
    const opt = this.options().find(o => o.value === v);
    return opt?.label ?? '';
  });

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return this.options();
    return this.options().filter(o => o.label.toLowerCase().includes(q));
  });

  protected readonly triggerClass = computed(() =>
    cn(comboboxTriggerVariants({ size: this.size() }), this.class())
  );

  optionClass(index: number): string {
    const base = 'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors';
    const active = index === this.activeIndex() ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50';
    return cn(base, active);
  }

  private updateDropdownPosition(): void {
    const trigger = this.triggerRef()?.nativeElement;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const dropdown = this.dropdownRef()?.nativeElement;
    if (dropdown) {
      dropdown.style.top = `${rect.bottom + 4}px`;
      dropdown.style.left = `${rect.left}px`;
      dropdown.style.width = `${rect.width}px`;
    }
  }

  private addGlobalListeners(): void {
    this.removeGlobalListeners();
    this.scrollHandler = () => {
      requestAnimationFrame(() => this.updateDropdownPosition());
    };
    this.resizeHandler = () => {
      requestAnimationFrame(() => this.updateDropdownPosition());
    };
    document.addEventListener('scroll', this.scrollHandler, { capture: true, passive: true });
    window.addEventListener('resize', this.resizeHandler, { passive: true });
  }

  private removeGlobalListeners(): void {
    if (this.scrollHandler) {
      document.removeEventListener('scroll', this.scrollHandler, { capture: true } as EventListenerOptions);
      this.scrollHandler = null;
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
  }

  ngOnDestroy(): void {
    this.removeGlobalListeners();
  }

  toggle(): void {
    if (this.open()) {
      this.close();
    } else {
      this.updateDropdownPosition();
      this.open.set(true);
      this.query.set('');
      this.activeIndex.set(0);
      this.addGlobalListeners();
      setTimeout(() => {
        this.updateDropdownPosition();
        this.searchRef()?.nativeElement.focus();
      });
    }
  }

  close(): void {
    this.open.set(false);
    this.query.set('');
    this.removeGlobalListeners();
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.query.set(val);
    this.activeIndex.set(0);
  }

  select(opt: ComboboxOption): void {
    this.value.set(opt.value);
    this._onChange(opt.value);
    this.close();
  }

  onKeydown(event: KeyboardEvent): void {
    const items = this.filtered();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update(i => Math.min(i + 1, items.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (items[this.activeIndex()]) {
          this.select(items[this.activeIndex()]);
        }
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }
}
