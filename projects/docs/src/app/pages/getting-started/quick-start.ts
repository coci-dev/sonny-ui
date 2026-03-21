import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { SnyButtonDirective } from 'core';

@Component({
  selector: 'docs-quick-start',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, SnyButtonDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Quick Start</h1>
        <p class="text-muted-foreground mt-2">Start using SonnyUI components in minutes.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">1. Import a component</h2>
        <p class="text-sm text-muted-foreground">
          Import the directive you want to use directly in your component:
        </p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">2. Use it in your template</h2>
        <p class="text-sm text-muted-foreground">
          SonnyUI uses directives instead of wrapper components, so you apply them to native HTML elements:
        </p>
        <docs-component-preview [code]="usageCode" language="html">
          <button snyBtn>Click me</button>
          <button snyBtn variant="outline">Outline</button>
          <button snyBtn variant="secondary">Secondary</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">3. Customize with inputs</h2>
        <p class="text-sm text-muted-foreground">
          All SonnyUI components use Angular signals as inputs. Pass values using property binding:
        </p>
        <docs-code-block [code]="inputsCode" language="html" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Next steps</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Explore the <a href="/docs/components/button" class="text-primary underline">Components</a> section</li>
          <li>Learn about <a href="/docs/theming/overview" class="text-primary underline">Theming</a></li>
          <li>Check out the <a href="/docs/schematics/ng-add" class="text-primary underline">Schematics</a></li>
        </ul>
      </section>
    </div>
  `,
})
export class QuickStartComponent {
  importCode = `import { Component } from '@angular/core';
import { SnyButtonDirective } from '@sonny-ui/core';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [SnyButtonDirective],
  template: \`<button snyBtn>Click me</button>\`,
})
export class ExampleComponent {}`;

  usageCode = `<button snyBtn>Click me</button>
<button snyBtn variant="outline">Outline</button>
<button snyBtn variant="secondary">Secondary</button>`;

  inputsCode = `<button snyBtn variant="destructive" size="lg">Delete</button>
<button snyBtn [disabled]="true">Disabled</button>
<button snyBtn [loading]="isLoading">Submit</button>`;
}
