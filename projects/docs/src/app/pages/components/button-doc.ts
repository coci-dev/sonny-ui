import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyButtonDirective, type ButtonVariant, type ButtonSize } from 'core';

@Component({
  selector: 'docs-button-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyButtonDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Button</h1>
        <p class="text-muted-foreground mt-2">Displays a button or a component that looks like a button.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <button snyBtn>Click me</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Variants</h2>
        <docs-component-preview [code]="variantsCode">
          @for (v of variants; track v) {
            <button snyBtn [variant]="v">{{ v }}</button>
          }
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Sizes</h2>
        <docs-component-preview [code]="sizesCode">
          @for (s of sizes; track s) {
            <button snyBtn [size]="s">{{ s }}</button>
          }
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">States</h2>
        <docs-component-preview [code]="statesCode">
          <button snyBtn [disabled]="true">Disabled</button>
          <button snyBtn [loading]="true">Loading</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">As Link</h2>
        <docs-component-preview [code]="linkCode">
          <a snyBtn variant="link" href="#">Link Button</a>
          <a snyBtn variant="outline" href="#">Outline Link</a>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <p class="text-sm text-muted-foreground">Real-world usage patterns with state management.</p>

        <h3 class="text-lg font-medium">Async Submit Button</h3>
        <docs-component-preview [code]="asyncButtonCode" language="typescript">
          <div class="flex items-center gap-4">
            <button snyBtn [loading]="saving()" [disabled]="saving()" (click)="handleSave()">
              {{ saving() ? 'Saving...' : saved() ? 'Saved!' : 'Save Changes' }}
            </button>
            <button snyBtn variant="outline" [disabled]="saving()" (click)="reset()">Reset</button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">API Reference</h2>
        <docs-props-table [props]="buttonProps" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Sets <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-disabled</code> when disabled or loading</li>
          <li>Sets <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tabindex="-1"</code> when disabled or loading</li>
          <li>Works with both <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;button&gt;</code> and <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;a&gt;</code> elements</li>
        </ul>
      </section>
    </div>
  `,
})
export class ButtonDocComponent {
  variants: ButtonVariant[] = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
  sizes: ButtonSize[] = ['sm', 'md', 'lg', 'icon'];

  importCode = `import { SnyButtonDirective } from '@sonny-ui/core';`;

  basicCode = `<button snyBtn>Click me</button>`;

  variantsCode = `<button snyBtn>Default</button>
<button snyBtn variant="destructive">Destructive</button>
<button snyBtn variant="outline">Outline</button>
<button snyBtn variant="secondary">Secondary</button>
<button snyBtn variant="ghost">Ghost</button>
<button snyBtn variant="link">Link</button>`;

  sizesCode = `<button snyBtn size="sm">Small</button>
<button snyBtn size="md">Medium</button>
<button snyBtn size="lg">Large</button>
<button snyBtn size="icon">...</button>`;

  statesCode = `<button snyBtn [disabled]="true">Disabled</button>
<button snyBtn [loading]="true">Loading</button>`;

  linkCode = `<a snyBtn variant="link" href="#">Link Button</a>
<a snyBtn variant="outline" href="#">Outline Link</a>`;

  // Examples state
  readonly saving = signal(false);
  readonly saved = signal(false);

  async handleSave() {
    this.saving.set(true);
    this.saved.set(false);
    await new Promise(r => setTimeout(r, 2000));
    this.saving.set(false);
    this.saved.set(true);
  }

  reset() {
    this.saved.set(false);
  }

  asyncButtonCode = `@Component({
  imports: [SnyButtonDirective],
  template: \`
    <button snyBtn [loading]="saving()" [disabled]="saving()" (click)="handleSave()">
      {{ saving() ? 'Saving...' : saved() ? 'Saved!' : 'Save Changes' }}
    </button>
  \`,
})
export class SaveButtonExample {
  readonly saving = signal(false);
  readonly saved = signal(false);

  async handleSave() {
    this.saving.set(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.saving.set(false);
    this.saved.set(true);
  }
}`;

  buttonProps: PropDef[] = [
    { name: 'variant', type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: "'default'", description: 'The visual style of the button.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", default: "'md'", description: 'The size of the button.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Whether the button is in a loading state.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
