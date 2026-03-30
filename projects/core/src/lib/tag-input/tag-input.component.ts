import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import { tagInputContainerVariants, tagVariants, type TagInputSize } from './tag-input.variants';

@Component({
  selector: 'sny-tag-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyTagInputComponent), multi: true },
  ],
  template: `
    <div [class]="containerClass()" (click)="focusInput()">
      @for (tag of value(); track tag; let i = $index) {
        <span [class]="tagClass()">
          {{ tag }}
          @if (removable() && !isDisabled()) {
            <button
              type="button"
              class="hover:text-destructive transition-colors leading-none"
              (click)="removeTag(i); $event.stopPropagation()"
              [attr.aria-label]="'Remove ' + tag"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          }
        </span>
      }
      @if (!atMax()) {
        <input
          #inputEl
          type="text"
          class="flex-1 min-w-[80px] outline-none bg-transparent"
          [placeholder]="value().length === 0 ? placeholder() : ''"
          [disabled]="isDisabled()"
          [value]="inputValue()"
          (input)="onInput($event)"
          (keydown)="onKeydown($event)"
          (blur)="onBlur()"
          [attr.aria-label]="'Add tag'"
        />
      }
    </div>
  `,
})
export class SnyTagInputComponent implements ControlValueAccessor {
  readonly value = model<string[]>([]);
  readonly placeholder = input('Add tag...');
  readonly maxTags = input<number | null>(null);
  readonly allowDuplicates = input(false);
  readonly removable = input(true);
  readonly addOnBlur = input(true);
  readonly separators = input<string[]>(['Enter', ',']);
  readonly validate = input<((tag: string) => boolean) | null>(null);
  readonly disabled = input(false);
  readonly size = input<TagInputSize>('md');
  readonly class = input<string>('');

  readonly tagAdded = output<string>();
  readonly tagRemoved = output<string>();

  readonly inputValue = signal('');
  private readonly _disabledByCva = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this._disabledByCva());
  readonly atMax = computed(() => this.maxTags() !== null && this.value().length >= this.maxTags()!);

  readonly containerClass = computed(() =>
    cn(tagInputContainerVariants({ size: this.size() }), this.isDisabled() && 'opacity-50 cursor-not-allowed', this.class())
  );

  readonly tagClass = computed(() =>
    cn(tagVariants({ size: this.size() }), 'bg-secondary text-secondary-foreground')
  );

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  private _onChange: (value: string[]) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(val: string[]): void {
    this.value.set(val ?? []);
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  focusInput(): void {
    this.inputRef()?.nativeElement.focus();
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    // Check if separator character was typed (e.g. comma)
    const seps = this.separators().filter((s) => s.length === 1);
    for (const sep of seps) {
      if (val.includes(sep)) {
        const parts = val.split(sep);
        for (const part of parts) {
          this.addTag(part);
        }
        this.inputValue.set('');
        return;
      }
    }
    this.inputValue.set(val);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.separators().includes(event.key) && event.key !== ',') {
      event.preventDefault();
      this.addTag(this.inputValue());
      this.inputValue.set('');
      return;
    }

    if (event.key === 'Backspace' && this.inputValue() === '') {
      const tags = this.value();
      if (tags.length > 0) {
        this.removeTag(tags.length - 1);
      }
    }
  }

  onBlur(): void {
    if (this.addOnBlur() && this.inputValue().trim()) {
      this.addTag(this.inputValue());
      this.inputValue.set('');
    }
    this._onTouched();
  }

  addTag(raw: string): void {
    const tag = raw.trim();
    if (!tag) return;
    if (this.atMax()) return;
    if (!this.allowDuplicates() && this.value().includes(tag)) return;

    const validateFn = this.validate();
    if (validateFn && !validateFn(tag)) return;

    this.value.update((tags) => [...tags, tag]);
    this._onChange(this.value());
    this.tagAdded.emit(tag);
  }

  removeTag(index: number): void {
    const removed = this.value()[index];
    this.value.update((tags) => tags.filter((_, i) => i !== index));
    this._onChange(this.value());
    this.tagRemoved.emit(removed);
  }
}
