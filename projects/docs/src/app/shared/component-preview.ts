import { Component, input } from '@angular/core';
import { CodeBlockComponent } from './code-block';

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
          Preview
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
          Code
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
}
