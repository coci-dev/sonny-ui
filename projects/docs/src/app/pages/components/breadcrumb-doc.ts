import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import {
  SnyBreadcrumbDirective,
  SnyBreadcrumbListDirective,
  SnyBreadcrumbItemDirective,
  SnyBreadcrumbLinkDirective,
  SnyBreadcrumbSeparatorDirective,
  SnyBreadcrumbPageDirective,
} from 'core';

@Component({
  selector: 'docs-breadcrumb-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    SnyBreadcrumbDirective,
    SnyBreadcrumbListDirective,
    SnyBreadcrumbItemDirective,
    SnyBreadcrumbLinkDirective,
    SnyBreadcrumbSeparatorDirective,
    SnyBreadcrumbPageDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Breadcrumb</h1>
        <p class="text-muted-foreground mt-2">Displays the path to the current resource using a hierarchy of links.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode" language="markup">
          <nav snyBreadcrumb>
            <ol snyBreadcrumbList>
              <li snyBreadcrumbItem>
                <a snyBreadcrumbLink href="#">Home</a>
              </li>
              <li snyBreadcrumbSeparator>/</li>
              <li snyBreadcrumbItem>
                <a snyBreadcrumbLink href="#">Components</a>
              </li>
              <li snyBreadcrumbSeparator>/</li>
              <li snyBreadcrumbItem>
                <span snyBreadcrumbPage>Breadcrumb</span>
              </li>
            </ol>
          </nav>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">Dynamic Breadcrumb</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-4">
            <nav snyBreadcrumb>
              <ol snyBreadcrumbList>
                @for (segment of segments(); track segment.label; let last = $last) {
                  <li snyBreadcrumbItem>
                    @if (last) {
                      <span snyBreadcrumbPage>{{ segment.label }}</span>
                    } @else {
                      <a snyBreadcrumbLink href="#">{{ segment.label }}</a>
                    }
                  </li>
                  @if (!last) {
                    <li snyBreadcrumbSeparator>/</li>
                  }
                }
              </ol>
            </nav>
            <div class="flex gap-2">
              <button
                class="text-xs text-muted-foreground hover:text-foreground underline"
                (click)="pushSegment()"
              >
                Add segment
              </button>
              <button
                class="text-xs text-muted-foreground hover:text-foreground underline"
                (click)="popSegment()"
              >
                Remove segment
              </button>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Uses <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">nav</code> with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-label="Breadcrumb"</code></li>
          <li>Current page has <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-current="page"</code></li>
          <li>Separators are hidden from assistive tech with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-hidden</code></li>
        </ul>
      </section>
    </div>
  `,
})
export class BreadcrumbDocComponent {
  private counter = 0;
  readonly segments = signal([
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Components', href: '/docs/components' },
  ]);

  importCode = `import {
  SnyBreadcrumbDirective,
  SnyBreadcrumbListDirective,
  SnyBreadcrumbItemDirective,
  SnyBreadcrumbLinkDirective,
  SnyBreadcrumbSeparatorDirective,
  SnyBreadcrumbPageDirective,
} from '@sonny-ui/core';`;

  basicCode = `<nav snyBreadcrumb>
  <ol snyBreadcrumbList>
    <li snyBreadcrumbItem>
      <a snyBreadcrumbLink href="#">Home</a>
    </li>
    <li snyBreadcrumbSeparator>/</li>
    <li snyBreadcrumbItem>
      <span snyBreadcrumbPage>Current</span>
    </li>
  </ol>
</nav>`;

  exampleCode = `readonly segments = signal([
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs' },
]);

@for (segment of segments(); track segment.label; let last = $last) {
  @if (last) {
    <span snyBreadcrumbPage>{{ segment.label }}</span>
  } @else {
    <a snyBreadcrumbLink [href]="segment.href">{{ segment.label }}</a>
  }
}`;

  pushSegment(): void {
    this.counter++;
    this.segments.update(s => [...s, { label: 'Page ' + this.counter, href: '#' }]);
  }

  popSegment(): void {
    this.segments.update(s => (s.length > 1 ? s.slice(0, -1) : s));
  }
}
