import { Component, signal, computed } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyButtonDirective,
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardDescriptionDirective,
  SnyCardContentDirective,
  SnyCardFooterDirective,
} from 'core';

@Component({
  selector: 'docs-card-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyButtonDirective,
    SnyCardDirective,
    SnyCardHeaderDirective,
    SnyCardTitleDirective,
    SnyCardDescriptionDirective,
    SnyCardContentDirective,
    SnyCardFooterDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Card</h1>
        <p class="text-muted-foreground mt-2">Displays a card with header, content, and footer.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <div snyCard class="w-[350px]">
            <div snyCardHeader>
              <h3 snyCardTitle>Card Title</h3>
              <p snyCardDescription>Card description goes here.</p>
            </div>
            <div snyCardContent>
              <p class="text-sm">Card content with any elements you need.</p>
            </div>
            <div snyCardFooter>
              <button snyBtn variant="outline" size="sm">Cancel</button>
              <button snyBtn size="sm">Save</button>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Variants</h2>
        <docs-component-preview [code]="variantsCode">
          @for (v of cardVariants; track v) {
            <div snyCard [variant]="v" class="w-[200px]">
              <div snyCardHeader>
                <h3 snyCardTitle class="text-base">{{ v }}</h3>
                <p snyCardDescription>{{ v }} variant</p>
              </div>
            </div>
          }
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <p class="text-sm text-muted-foreground">Real-world usage patterns with state management.</p>

        <h3 class="text-lg font-medium">Selectable Card List</h3>
        <docs-component-preview [code]="selectableCardCode" language="typescript">
          <div class="grid gap-3 w-full max-w-md">
            @for (plan of plans; track plan.id) {
              <div
                snyCard
                [variant]="selectedPlan() === plan.id ? 'outline' : 'default'"
                [class]="selectedPlan() === plan.id ? 'ring-2 ring-primary cursor-pointer' : 'cursor-pointer'"
                (click)="selectedPlan.set(plan.id)"
              >
                <div snyCardHeader>
                  <h3 snyCardTitle class="text-base">{{ plan.name }}</h3>
                  <p snyCardDescription>{{ plan.description }}</p>
                </div>
              </div>
            }
          </div>
          <p class="text-sm text-muted-foreground mt-3">Selected: {{ selectedPlanName() }}</p>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">API Reference</h2>
        <h3 class="text-lg font-medium">SnyCardDirective</h3>
        <docs-props-table [props]="cardProps" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Sub-directives</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyCardHeader</code> — Flex column container with spacing</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyCardTitle</code> — Styled heading</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyCardDescription</code> — Muted description text</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyCardContent</code> — Padded content area</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyCardFooter</code> — Flex row footer</li>
        </ul>
      </section>
    </div>
  `,
})
export class CardDocComponent {
  cardVariants: ('default' | 'outline' | 'elevated' | 'ghost')[] = ['default', 'outline', 'elevated', 'ghost'];

  importCode = `import {
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardDescriptionDirective,
  SnyCardContentDirective,
  SnyCardFooterDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyCard>
  <div snyCardHeader>
    <h3 snyCardTitle>Card Title</h3>
    <p snyCardDescription>Card description goes here.</p>
  </div>
  <div snyCardContent>
    <p>Card content with any elements you need.</p>
  </div>
  <div snyCardFooter>
    <button snyBtn variant="outline" size="sm">Cancel</button>
    <button snyBtn size="sm">Save</button>
  </div>
</div>`;

  variantsCode = `<div snyCard variant="default">...</div>
<div snyCard variant="outline">...</div>
<div snyCard variant="elevated">...</div>
<div snyCard variant="ghost">...</div>`;

  // Examples state
  readonly plans = [
    { id: 'free', name: 'Free', description: '$0/mo — For personal projects' },
    { id: 'pro', name: 'Pro', description: '$19/mo — For professionals' },
    { id: 'team', name: 'Team', description: '$49/mo — For teams up to 10' },
  ];
  readonly selectedPlan = signal('free');
  readonly selectedPlanName = computed(() => this.plans.find(p => p.id === this.selectedPlan())?.name ?? '');

  selectableCardCode = `@Component({
  imports: [SnyCardDirective, SnyCardHeaderDirective, SnyCardTitleDirective, SnyCardDescriptionDirective],
  template: \`
    <div class="grid gap-3 w-full max-w-md">
      @for (plan of plans; track plan.id) {
        <div
          snyCard
          [variant]="selectedPlan() === plan.id ? 'outline' : 'default'"
          [class]="selectedPlan() === plan.id ? 'ring-2 ring-primary cursor-pointer' : 'cursor-pointer'"
          (click)="selectedPlan.set(plan.id)"
        >
          <div snyCardHeader>
            <h3 snyCardTitle class="text-base">{{ plan.name }}</h3>
            <p snyCardDescription>{{ plan.description }}</p>
          </div>
        </div>
      }
    </div>
    <p class="text-sm text-muted-foreground mt-3">Selected: {{ selectedPlanName() }}</p>
  \`,
})
export class SelectableCardListExample {
  readonly plans = [
    { id: 'free', name: 'Free', description: '$0/mo — For personal projects' },
    { id: 'pro', name: 'Pro', description: '$19/mo — For professionals' },
    { id: 'team', name: 'Team', description: '$49/mo — For teams up to 10' },
  ];
  readonly selectedPlan = signal('free');
  readonly selectedPlanName = computed(() => this.plans.find(p => p.id === this.selectedPlan())?.name ?? '');
}`;

  cardProps: PropDef[] = [
    { name: 'variant', type: "'default' | 'outline' | 'elevated' | 'ghost'", default: "'default'", description: 'The visual style of the card.' },
    { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'none'", description: 'Padding applied to the card.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
