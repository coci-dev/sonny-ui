import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';

@Component({
  selector: 'docs-development',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Contributing</h1>
        <p class="text-muted-foreground mt-2">Thanks for your interest in contributing to SonnyUI! Here's how to get started.</p>
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
        <h2 class="text-xl font-semibold">Getting Started</h2>
        <docs-code-block [code]="setupCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Development Workflow</h2>
        <ol class="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>Create a new branch from <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">main</code>:
            <docs-code-block [code]="branchCode" language="bash" />
          </li>
          <li>Make your changes</li>
          <li>Run tests: <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">npm test</code></li>
          <li>Commit following the <span class="text-foreground font-medium">commit conventions</span> below</li>
          <li>Push to your fork and open a Pull Request</li>
        </ol>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Commit Conventions</h2>
        <p class="text-sm text-muted-foreground">We use <a href="https://www.conventionalcommits.org/" target="_blank" rel="noopener" class="text-primary underline">Conventional Commits</a>:</p>
        <docs-code-block [code]="commitCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Project Structure</h2>
        <docs-code-block [code]="structureCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Common Commands</h2>
        <docs-code-block [code]="commandsCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Adding a New Component</h2>
        <ol class="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>Create a new folder under <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">projects/core/src/lib/</code></li>
          <li>Create the variants file with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">cva()</code></li>
          <li>Create the directive using Angular signals</li>
          <li>Create an <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">index.ts</code> barrel file</li>
          <li>Export from <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">public-api.ts</code></li>
          <li>Add a documentation page in <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">projects/docs/</code></li>
          <li>Write tests</li>
        </ol>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Pull Request Guidelines</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Keep PRs focused on a single change</li>
          <li>Update documentation if needed</li>
          <li>Add tests for new features</li>
          <li>Make sure all status checks pass</li>
          <li>Fill out the PR template</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Code Style</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Use Angular signal inputs (<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">input()</code>) instead of decorators</li>
          <li>Use <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">computed()</code> for derived state</li>
          <li>Prefer directives over components when possible</li>
          <li>Use <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">class-variance-authority</code> for variant definitions</li>
          <li>All components must be standalone</li>
          <li>No zone.js dependency</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Questions?</h2>
        <p class="text-sm text-muted-foreground">Open an <a href="https://github.com/coci-dev/sonny-ui/issues" target="_blank" rel="noopener" class="text-primary underline">issue</a> and we'll help you out.</p>
      </section>
    </div>
  `,
})
export class DevelopmentComponent {
  setupCode = `# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/sonny-ui.git
cd sonny-ui

# Install dependencies
npm install

# Build the library
npm run build

# Start the docs site
npm run docs:dev`;

  branchCode = `git checkout -b feat/my-feature`;

  commitCode = `# Examples:
feat: add tooltip component
fix: correct button loading state alignment
docs: update installation instructions
refactor: simplify theme service logic
test: add accordion keyboard navigation tests
chore: update dependencies`;

  structureCode = `sonny-ui/
  projects/
    core/           # The component library
      src/lib/      # Components (button, card, input, etc.)
      schematics/   # ng add schematic
    docs/           # Documentation site (this site)
  angular.json      # Workspace config
  package.json      # Root package.json`;

  commandsCode = `# Development
npm run docs:dev    # Serve the docs site

# Building
npm run build       # Build the core library
npm run docs:build  # Build the docs site
npm run build:all   # Build everything

# Testing
npm test            # Run tests once
npm run test:watch  # Run tests in watch mode`;
}
