import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';

@Component({
  selector: 'docs-copy-paste',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Copy & Paste</h1>
        <p class="text-muted-foreground mt-2">Own the code. Copy components directly into your project.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Philosophy</h2>
        <p class="text-sm text-muted-foreground">
          SonnyUI follows the same philosophy as shadcn/ui: you can use it as an npm package,
          or copy the source code directly into your project. This gives you full control to
          customize components without fighting against library abstractions.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Automatic (recommended)</h2>
        <p class="text-sm text-muted-foreground">
          Use the schematic to copy a component automatically. It handles file copying, import rewrites, and the <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">cn()</code> utility for you:
        </p>
        <docs-code-block [code]="generateCode" language="bash" />
        <p class="text-sm text-muted-foreground">
          Options:
        </p>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">--path</code> — target directory (default: <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">src/app/ui</code>)</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">--prefix</code> — selector prefix (default: <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">sny</code>)</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">--skipTests</code> — don't copy test files</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Manual</h2>
        <ol class="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong class="text-foreground">Copy the source files</strong> — Each component lives in its own folder
            with a directive, variants, and index file.
          </li>
          <li>
            <strong class="text-foreground">Copy shared utilities</strong> — You'll need the
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">cn()</code> utility and the theme CSS.
          </li>
          <li>
            <strong class="text-foreground">Update imports</strong> — Change import paths to point to your local copies.
          </li>
        </ol>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Example: Button</h2>
        <p class="text-sm text-muted-foreground">Copy these files into your project:</p>
        <docs-code-block [code]="structureCode" language="bash" />

        <h3 class="text-lg font-medium">The cn() utility</h3>
        <docs-code-block [code]="cnCode" language="typescript" />

        <h3 class="text-lg font-medium">Button variants</h3>
        <docs-code-block [code]="variantsCode" language="typescript" />

        <h3 class="text-lg font-medium">Button directive</h3>
        <docs-code-block [code]="directiveCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Dependencies</h2>
        <p class="text-sm text-muted-foreground">
          If copying components, you still need these packages:
        </p>
        <docs-code-block [code]="depsCode" language="bash" />
      </section>
    </div>
  `,
})
export class CopyPasteComponent {
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

  depsCode = `npm install clsx tailwind-merge class-variance-authority`;
}
