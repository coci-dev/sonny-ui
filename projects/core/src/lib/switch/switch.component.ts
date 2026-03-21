import { Component, computed, input, model } from '@angular/core';
import { cn } from '../core/utils/cn';
import { switchTrackVariants, switchThumbSize, switchThumbTranslate, type SwitchSize } from './switch.variants';

@Component({
  selector: 'sny-switch',
  standalone: true,
  host: { class: 'inline-flex' },
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      [disabled]="disabled()"
      [class]="trackClass()"
      (click)="checked.set(!checked())"
    >
      <span [class]="thumbClass()"></span>
    </button>
  `,
})
export class SnySwitchComponent {
  readonly checked = model(false);
  readonly disabled = input(false);
  readonly size = input<SwitchSize>('md');
  readonly class = input<string>('');

  protected readonly trackClass = computed(() =>
    cn(
      switchTrackVariants({ size: this.size() }),
      this.checked() ? 'bg-primary' : 'bg-input',
      this.class()
    )
  );

  protected readonly thumbClass = computed(() =>
    cn(
      'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
      switchThumbSize[this.size()],
      this.checked() ? switchThumbTranslate[this.size()] : 'translate-x-0'
    )
  );
}
