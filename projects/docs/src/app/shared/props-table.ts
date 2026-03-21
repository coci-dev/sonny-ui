import { Component, input } from '@angular/core';

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
            <th class="px-4 py-3 text-left font-medium">Prop</th>
            <th class="px-4 py-3 text-left font-medium">Type</th>
            <th class="px-4 py-3 text-left font-medium">Default</th>
            <th class="px-4 py-3 text-left font-medium">Description</th>
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
}
