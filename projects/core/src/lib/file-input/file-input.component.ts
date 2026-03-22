import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import {
  fileInputVariants,
  type FileInputVariant,
  type FileInputSize,
} from './file-input.variants';

@Component({
  selector: 'sny-file-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"w-full"',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyFileInputComponent), multi: true },
  ],
  template: `
    <label
      [class]="labelClass()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <input
        #fileInput
        type="file"
        class="sr-only"
        [accept]="accept()"
        [multiple]="multiple()"
        [disabled]="isDisabled()"
        [attr.aria-label]="placeholder()"
        [attr.aria-invalid]="variant() === 'error' || null"
        (change)="onFileSelected($event)"
        (blur)="onTouched()"
      />
      <span class="truncate text-muted-foreground">{{ fileName() }}</span>
    </label>
  `,
})
export class SnyFileInputComponent implements ControlValueAccessor {
  readonly accept = input('');
  readonly multiple = input(false);
  readonly disabled = input(false);
  readonly placeholder = input('Choose file...');
  readonly variant = input<FileInputVariant>('default');
  readonly size = input<FileInputSize>('md');
  readonly maxSize = input(0);
  readonly class = input<string>('');

  readonly value = model<FileList | null>(null);
  readonly fileChange = output<FileList>();
  readonly error = output<string>();

  private readonly _disabledByCva = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this._disabledByCva());

  private readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  readonly isDragOver = signal(false);

  private _onChange: (value: FileList | null) => void = () => {};
  protected onTouched: () => void = () => {};
  private _writing = false;

  constructor() {
    effect(() => {
      const val = this.value();
      if (this._writing) {
        this._writing = false;
        return;
      }
      this._onChange(val);
    });
  }

  writeValue(val: FileList | null): void {
    this._writing = true;
    this.value.set(val ?? null);
  }

  registerOnChange(fn: (value: FileList | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  readonly fileName = computed(() => {
    const files = this.value();
    if (!files || files.length === 0) return this.placeholder();
    if (files.length === 1) return files[0].name;
    return `${files.length} files selected`;
  });

  protected readonly labelClass = computed(() =>
    cn(
      fileInputVariants({ variant: this.variant(), size: this.size() }),
      this.isDragOver() && 'ring-2 ring-ring',
      this.class()
    )
  );

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(input.files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.isDisabled()) {
      this.isDragOver.set(true);
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    if (!this.isDisabled() && event.dataTransfer?.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  clear(): void {
    this.value.set(null);
    const inputEl = this.fileInputRef()?.nativeElement;
    if (inputEl) inputEl.value = '';
  }

  private processFiles(files: FileList): void {
    const maxSize = this.maxSize();
    if (maxSize > 0) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          this.error.emit(`File "${files[i].name}" exceeds maximum size of ${maxSize} bytes`);
          return;
        }
      }
    }
    this.value.set(files);
    this.fileChange.emit(files);
  }
}
