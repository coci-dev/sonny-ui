import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnySliderComponent, SnyLabelDirective } from 'core';

@Component({
  selector: 'docs-slider-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnySliderComponent, SnyLabelDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Slider</h1>
        <p class="text-muted-foreground mt-2">An input where the user selects a value from within a given range.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <div class="w-full max-w-sm space-y-2">
            <sny-slider [(value)]="volume" />
            <p class="text-sm text-muted-foreground">Value: {{ volume() }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Sizes</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="w-full max-w-sm space-y-4">
            <div class="space-y-1">
              <label snyLabel>Small</label>
              <sny-slider size="sm" [value]="30" />
            </div>
            <div class="space-y-1">
              <label snyLabel>Medium</label>
              <sny-slider size="md" [value]="50" />
            </div>
            <div class="space-y-1">
              <label snyLabel>Large</label>
              <sny-slider size="lg" [value]="70" />
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">Volume Control</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="w-full max-w-sm space-y-2">
            <div class="flex justify-between text-sm">
              <label snyLabel>Volume</label>
              <span class="text-muted-foreground">{{ volume() }}%</span>
            </div>
            <sny-slider [(value)]="volume" [min]="0" [max]="100" [step]="5" />
            <div class="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>100</span>
            </div>
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
export class SliderDocComponent {
  readonly volume = signal(50);

  importCode = `import { SnySliderComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-slider [(value)]="volume" />`;
  sizesCode = `<sny-slider size="sm" [value]="30" />
<sny-slider size="md" [value]="50" />
<sny-slider size="lg" [value]="70" />`;
  exampleCode = `readonly volume = signal(50);

<sny-slider [(value)]="volume" [min]="0" [max]="100" [step]="5" />`;

  props: PropDef[] = [
    { name: 'value', type: 'number', default: '0', description: 'Current value. Supports two-way binding.' },
    { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
    { name: 'step', type: 'number', default: '1', description: 'Step increment.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the slider is disabled.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the slider.' },
  ];
}
