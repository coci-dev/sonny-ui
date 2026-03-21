import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';

@Component({
  selector: 'docs-ng-add',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">ng add</h1>
        <p class="text-muted-foreground mt-2">Automatically set up SonnyUI in your Angular project.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-code-block [code]="addCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">What it does</h2>
        <p class="text-sm text-muted-foreground">The schematic performs the following steps:</p>
        <ol class="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong class="text-foreground">Installs dependencies</strong> — Adds
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&#64;sonny-ui/core</code> to your package.json.
          </li>
          <li>
            <strong class="text-foreground">Imports theme CSS</strong> — Adds the SonnyUI theme import to your global stylesheet.
          </li>
          <li>
            <strong class="text-foreground">Configures Tailwind</strong> — Adds the
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&#64;source</code> directive so Tailwind scans SonnyUI classes.
          </li>
          <li>
            <strong class="text-foreground">Adds provider</strong> — Adds
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">provideSonnyUI()</code> to your app config.
          </li>
        </ol>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Options</h2>
        <docs-code-block [code]="optionsCode" language="bash" />
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">--project</code> — Target project name (defaults to the default project)</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">--theme</code> — Default theme: <code class="font-mono text-xs">light</code>, <code class="font-mono text-xs">dark</code>, or <code class="font-mono text-xs">corporate</code></li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">After installation</h2>
        <p class="text-sm text-muted-foreground">
          You're ready to use SonnyUI components. Import any directive and use it in your templates:
        </p>
        <docs-code-block [code]="usageCode" language="typescript" />
      </section>
    </div>
  `,
})
export class NgAddComponent {
  addCode = `ng add @sonny-ui/core`;

  optionsCode = `ng add @sonny-ui/core --project=my-app --theme=dark`;

  usageCode = `import { SnyButtonDirective } from '@sonny-ui/core';

@Component({
  imports: [SnyButtonDirective],
  template: \`<button snyBtn variant="outline">Hello SonnyUI!</button>\`,
})
export class MyComponent {}`;
}
