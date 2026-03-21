import { Component, computed, inject, input } from '@angular/core';
import { CodeBlockComponent } from './code-block';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'docs-component-preview',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="rounded-lg border border-border overflow-hidden">
      <!-- Tabs -->
      <div class="flex border-b border-border bg-muted/30">
        <button
          (click)="tab = 'preview'"
          [class]="
            'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ' +
            (tab === 'preview'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground')
          "
        >
          {{ labels().preview }}
        </button>
        <button
          (click)="tab = 'code'"
          [class]="
            'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ' +
            (tab === 'code'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground')
          "
        >
          {{ labels().code }}
        </button>
      </div>

      <!-- Content -->
      @if (tab === 'preview') {
        <div class="p-6 flex items-center justify-center min-h-[120px] gap-4 flex-wrap">
          <ng-content />
        </div>
      } @else {
        <docs-code-block [code]="code()" [language]="language()" />
      }
    </div>
  `,
})
export class ComponentPreviewComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('html');
  tab: 'preview' | 'code' = 'preview';
  private readonly i18n = inject(I18nService);
  readonly labels = computed(() => this.i18n.common().shared);
}
