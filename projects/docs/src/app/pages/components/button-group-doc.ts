import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyButtonGroupDirective, SnyButtonDirective } from 'core';

@Component({
  selector: 'docs-button-group-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyButtonGroupDirective, SnyButtonDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Button Group</h1>
        <p class="text-muted-foreground mt-2">Groups a series of buttons together with connected borders.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <div snyButtonGroup>
            <button snyBtn variant="outline">Left</button>
            <button snyBtn variant="outline">Center</button>
            <button snyBtn variant="outline">Right</button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Vertical</h2>
        <docs-component-preview [code]="verticalCode">
          <div snyButtonGroup orientation="vertical">
            <button snyBtn variant="outline">Top</button>
            <button snyBtn variant="outline">Middle</button>
            <button snyBtn variant="outline">Bottom</button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">View Mode Toggle</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-4">
            <div snyButtonGroup>
              @for (view of views; track view) {
                <button
                  snyBtn
                  [variant]="activeView() === view ? 'default' : 'outline'"
                  (click)="activeView.set(view)"
                >
                  {{ view }}
                </button>
              }
            </div>
            <p class="text-sm text-muted-foreground">Active view: {{ activeView() }}</p>
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
export class ButtonGroupDocComponent {
  views = ['Grid', 'List', 'Table'];
  readonly activeView = signal('Grid');

  importCode = `import { SnyButtonGroupDirective } from '@sonny-ui/core';`;
  basicCode = `<div snyButtonGroup>
  <button snyBtn variant="outline">Left</button>
  <button snyBtn variant="outline">Center</button>
  <button snyBtn variant="outline">Right</button>
</div>`;
  verticalCode = `<div snyButtonGroup orientation="vertical">
  <button snyBtn variant="outline">Top</button>
  <button snyBtn variant="outline">Middle</button>
  <button snyBtn variant="outline">Bottom</button>
</div>`;
  exampleCode = `readonly activeView = signal('Grid');

<div snyButtonGroup>
  @for (view of views; track view) {
    <button snyBtn
      [variant]="activeView() === view ? 'default' : 'outline'"
      (click)="activeView.set(view)">
      {{ view }}
    </button>
  }
</div>`;

  props: PropDef[] = [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'The layout direction of the button group.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
