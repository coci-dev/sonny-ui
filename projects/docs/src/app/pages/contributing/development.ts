import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';

@Component({
  selector: 'docs-development',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Development</h1>
        <p class="text-muted-foreground mt-2">Set up SonnyUI for local development.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Prerequisites</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Node.js 22+</li>
          <li>npm 11+</li>
          <li>Git</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Getting started</h2>
        <docs-code-block [code]="setupCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Project structure</h2>
        <docs-code-block [code]="structureCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Common commands</h2>
        <docs-code-block [code]="commandsCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Adding a new component</h2>
        <ol class="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>Create a new folder under <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">projects/core/src/lib/</code></li>
          <li>Create the variants file with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">cva()</code></li>
          <li>Create the directive using Angular signals</li>
          <li>Create an <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">index.ts</code> barrel file</li>
          <li>Export from <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">public-api.ts</code></li>
          <li>Add a demo page and a docs page</li>
          <li>Write tests</li>
        </ol>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Code style</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Use Angular signal inputs (<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">input()</code>) instead of decorators</li>
          <li>Use <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">computed()</code> for derived state</li>
          <li>Prefer directives over components when possible</li>
          <li>Use <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">class-variance-authority</code> for variant definitions</li>
          <li>All components must be standalone</li>
          <li>No zone.js dependency</li>
        </ul>
      </section>
    </div>
  `,
})
export class DevelopmentComponent {
  setupCode = `# Clone the repository
git clone https://github.com/coci-dev/sonny-ui.git
cd sonny-ui

# Install dependencies
npm install

# Build the library
npm run build

# Start the demo app
npm start

# Start the docs site
npm run docs:dev`;

  structureCode = `sonny-ui/
  projects/
    core/           # The component library
      src/lib/      # Components (button, card, input, etc.)
      schematics/   # ng add schematic
    demo/           # Demo application
    docs/           # Documentation site (this site)
  angular.json      # Workspace config
  package.json      # Root package.json`;

  commandsCode = `# Development
npm start           # Serve the demo app
npm run docs:dev    # Serve the docs site

# Building
npm run build       # Build the core library
npm run build:demo  # Build the demo app
npm run docs:build  # Build the docs site
npm run build:all   # Build everything

# Testing
npm test            # Run tests once
npm run test:watch  # Run tests in watch mode`;
}
