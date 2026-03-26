import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { I18nService } from '../../i18n/i18n.service';
import { COPY_PASTE_EN } from '../../i18n/en/pages/copy-paste';
import { COPY_PASTE_ES } from '../../i18n/es/pages/copy-paste';

@Component({
  selector: 'docs-copy-paste',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().philosophy }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().philosophyDesc }}</p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().automatic }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().automaticDesc"></p>
        <docs-code-block [code]="generateCode" language="bash" />
        <p class="text-sm text-muted-foreground">{{ t().automaticOptions }}</p>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (opt of t().automaticOptionsList; track opt) {
            <li [innerHTML]="opt"></li>
          }
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().manual }}</h2>
        <ol class="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          @for (step of t().manualSteps; track step.strong) {
            <li>
              <strong class="text-foreground">{{ step.strong }}</strong>
              <span [innerHTML]="step.text"></span>
            </li>
          }
        </ol>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().exampleButton }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().exampleButtonDesc }}</p>
        <docs-code-block [code]="structureCode" language="bash" />

        <h3 class="text-lg font-medium">{{ t().cnUtility }}</h3>
        <docs-code-block [code]="cnCode" language="typescript" />

        <h3 class="text-lg font-medium">{{ t().buttonVariants }}</h3>
        <docs-code-block [code]="variantsCode" language="typescript" />

        <h3 class="text-lg font-medium">{{ t().buttonDirective }}</h3>
        <docs-code-block [code]="directiveCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().usageTitle }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().usageDesc }}</p>

        <h3 class="text-lg font-medium">{{ t().importDirective }}</h3>
        <docs-code-block [code]="importCode" language="typescript" />

        <h3 class="text-lg font-medium">{{ t().useTemplate }}</h3>
        <docs-code-block [code]="usageCode" language="html" />

        <p class="text-sm text-muted-foreground" [innerHTML]="t().availableVariants"></p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Available Components</h2>
        <p class="text-sm text-muted-foreground">All 50 components can be generated with the schematic:</p>
        <docs-code-block [code]="generateUsage" language="bash" />
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          @for (c of availableComponents; track c) {
            <code class="text-xs bg-muted px-2 py-1 rounded-sm text-foreground">{{ c }}</code>
          }
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().dependencies }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().dependenciesDesc }}</p>
        <docs-code-block [code]="depsCode" language="bash" />
      </section>
    </div>
  `,
})
export class CopyPasteComponent {
  private readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? COPY_PASTE_ES : COPY_PASTE_EN);

  generateCode = `ng generate @sonny-ui/core:component button`;

  structureCode = `src/
  ui/
    utils/
      cn.ts
    button/
      button.directive.ts
      button.variants.ts
      index.ts`;

  cnCode = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}`;

  variantsCode = `import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 ...',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        // ... add your variants
      },
      size: {
        sm: 'h-9 rounded-sm px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-sm px-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);`;

  directiveCode = `import { Directive, computed, input } from '@angular/core';
import { cn } from '../utils/cn';
import { buttonVariants } from './button.variants';

@Directive({
  selector: 'button[snyBtn], a[snyBtn]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyButtonDirective {
  readonly variant = input<string>('default');
  readonly size = input<string>('md');
  // ...
}`;

  importCode = `import { Component } from '@angular/core';
import { SnyButtonDirective } from './ui/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [SnyButtonDirective],
  template: \`
    <button snyBtn>Default</button>
    <button snyBtn variant="outline">Outline</button>
    <button snyBtn variant="destructive" size="sm">Delete</button>
  \`,
})
export class ExampleComponent {}`;

  usageCode = `<!-- Variants -->
<button snyBtn>Default</button>
<button snyBtn variant="destructive">Delete</button>
<button snyBtn variant="outline">Outline</button>
<button snyBtn variant="secondary">Secondary</button>
<button snyBtn variant="ghost">Ghost</button>
<button snyBtn variant="link">Link</button>

<!-- Sizes -->
<button snyBtn size="sm">Small</button>
<button snyBtn size="md">Medium</button>
<button snyBtn size="lg">Large</button>

<!-- States -->
<button snyBtn [disabled]="true">Disabled</button>
<button snyBtn [loading]="true">Loading...</button>

<!-- As link -->
<a snyBtn variant="outline" href="/about">About</a>`;

  generateUsage = `ng generate @sonny-ui/core:component <name>

# Examples:
ng generate @sonny-ui/core:component button
ng generate @sonny-ui/core:component accordion
ng generate @sonny-ui/core:component toast

# Options:
#   --path=src/app/components    Change output directory
#   --prefix=my                  Custom prefix (default: sny)
#   --skip-tests                 Skip test files`;

  availableComponents = [
    'accordion', 'alert', 'avatar', 'badge', 'breadcrumb', 'button',
    'button-group', 'calendar', 'card', 'carousel', 'chat-bubble',
    'checkbox', 'combobox', 'diff', 'divider', 'dock', 'drawer',
    'dropdown', 'fab', 'fieldset', 'file-input', 'indicator', 'input',
    'kbd', 'link', 'list', 'loader', 'modal', 'navbar', 'pagination',
    'progress', 'radial-progress', 'radio', 'rating', 'select', 'sheet',
    'skeleton', 'slider', 'stat', 'status', 'steps', 'switch', 'table',
    'tabs', 'textarea', 'timeline', 'toast', 'toggle', 'tooltip', 'validator',
  ];

  depsCode = `npm install clsx tailwind-merge class-variance-authority`;
}
