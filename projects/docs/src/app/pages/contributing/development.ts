import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { I18nService } from '../../i18n/i18n.service';
import { DEVELOPMENT_EN } from '../../i18n/en/pages/development';
import { DEVELOPMENT_ES } from '../../i18n/es/pages/development';

@Component({
  selector: 'docs-development',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().prerequisites }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().prerequisitesList; track item) {
            <li>{{ item }}</li>
          }
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().gettingStarted }}</h2>
        <docs-code-block [code]="setupCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().devWorkflow }}</h2>
        <ol class="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <span [innerHTML]="t().devWorkflowSteps[0].text"></span>
            <docs-code-block [code]="branchCode" language="bash" />
          </li>
          <li>{{ t().devWorkflowSteps[1].text }}</li>
          <li [innerHTML]="t().devWorkflowSteps[2].text"></li>
          <li [innerHTML]="t().devWorkflowSteps[3].text"></li>
          <li>{{ t().devWorkflowSteps[4].text }}</li>
        </ol>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().commitConventions }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().commitConventionsDesc"></p>
        <docs-code-block [code]="commitCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().projectStructure }}</h2>
        <docs-code-block [code]="structureCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().commonCommands }}</h2>
        <docs-code-block [code]="commandsCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().addingComponent }}</h2>
        <ol class="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          @for (step of t().addingComponentSteps; track step) {
            <li [innerHTML]="step"></li>
          }
        </ol>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().prGuidelines }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().prGuidelinesList; track item) {
            <li>{{ item }}</li>
          }
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().codeStyle }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().codeStyleList; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().questions }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().questionsDesc"></p>
      </section>
    </div>
  `,
})
export class DevelopmentComponent {
  private readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? DEVELOPMENT_ES : DEVELOPMENT_EN);

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
