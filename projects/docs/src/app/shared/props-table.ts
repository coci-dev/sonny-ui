import { Component, computed, inject, input } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

export interface PropDef {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'docs-props-table',
  standalone: true,
  template: `
    <div class="overflow-x-auto rounded-lg border border-border">
      <table class="w-full text-sm">
        <thead class="bg-muted/50">
          <tr>
            <th class="px-4 py-3 text-left font-medium">{{ headers().prop }}</th>
            <th class="px-4 py-3 text-left font-medium">{{ headers().type }}</th>
            <th class="px-4 py-3 text-left font-medium">{{ headers().default }}</th>
            <th class="px-4 py-3 text-left font-medium">{{ headers().description }}</th>
          </tr>
        </thead>
        <tbody>
          @for (prop of props(); track prop.name) {
            <tr class="border-t border-border">
              <td class="px-4 py-3 font-mono text-xs text-primary">{{ prop.name }}</td>
              <td class="px-4 py-3 font-mono text-xs">{{ prop.type }}</td>
              <td class="px-4 py-3 font-mono text-xs">{{ prop.default }}</td>
              <td class="px-4 py-3">{{ prop.description }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class PropsTableComponent {
  readonly props = input.required<PropDef[]>();
  private readonly i18n = inject(I18nService);
  readonly headers = computed(() => this.i18n.common().propsTable);
}
