import { Component, signal, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyBadgeDirective, type BadgeVariant } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { BADGE_DOC_EN } from '../../i18n/en/pages/badge-doc';
import { BADGE_DOC_ES } from '../../i18n/es/pages/badge-doc';

@Component({
  selector: 'docs-badge-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyBadgeDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.import }}</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.usage }}</h2>
        <docs-component-preview [code]="basicCode">
          <span snyBadge>Badge</span>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          @for (v of variants; track v) {
            <span snyBadge [variant]="v">{{ v }}</span>
          }
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <span snyBadge size="sm">Small</span>
          <span snyBadge size="md">Medium</span>
          <span snyBadge size="lg">Large</span>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().statusDashboard }}</h3>
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
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
      </section>
    </div>
  `,
})
export class BadgeDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? BADGE_DOC_ES : BADGE_DOC_EN);

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

  readonly props = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
