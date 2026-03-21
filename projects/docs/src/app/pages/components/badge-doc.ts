import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyBadgeDirective, type BadgeVariant } from 'core';

@Component({
  selector: 'docs-badge-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyBadgeDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Badge</h1>
        <p class="text-muted-foreground mt-2">Displays a badge or a component that looks like a badge.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <span snyBadge>Badge</span>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Variants</h2>
        <docs-component-preview [code]="variantsCode">
          @for (v of variants; track v) {
            <span snyBadge [variant]="v">{{ v }}</span>
          }
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Sizes</h2>
        <docs-component-preview [code]="sizesCode">
          <span snyBadge size="sm">Small</span>
          <span snyBadge size="md">Medium</span>
          <span snyBadge size="lg">Large</span>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">Status Dashboard</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span>API Server</span>
              <span snyBadge [variant]="status()">{{ status() }}</span>
            </div>
            <button
              class="text-xs text-muted-foreground hover:text-foreground underline"
              (click)="cycleStatus()"
            >
              Toggle Status
            </button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">API Reference</h2>
        <docs-props-table [props]="props" />
      </section>
    </div>
  `,
})
export class BadgeDocComponent {
  variants: BadgeVariant[] = ['default', 'secondary', 'outline', 'destructive', 'success', 'warning'];
  readonly status = signal<BadgeVariant>('success');
  private statusCycle: BadgeVariant[] = ['success', 'warning', 'destructive', 'default'];
  private statusIndex = 0;

  cycleStatus(): void {
    this.statusIndex = (this.statusIndex + 1) % this.statusCycle.length;
    this.status.set(this.statusCycle[this.statusIndex]);
  }

  importCode = `import { SnyBadgeDirective } from '@sonny-ui/core';`;
  basicCode = `<span snyBadge>Badge</span>`;
  variantsCode = `<span snyBadge>Default</span>
<span snyBadge variant="secondary">Secondary</span>
<span snyBadge variant="outline">Outline</span>
<span snyBadge variant="destructive">Destructive</span>
<span snyBadge variant="success">Success</span>
<span snyBadge variant="warning">Warning</span>`;
  sizesCode = `<span snyBadge size="sm">Small</span>
<span snyBadge size="md">Medium</span>
<span snyBadge size="lg">Large</span>`;
  exampleCode = `readonly status = signal<BadgeVariant>('success');

<span snyBadge [variant]="status()">{{ status() }}</span>`;

  props: PropDef[] = [
    { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'", default: "'default'", description: 'The visual style of the badge.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the badge.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
