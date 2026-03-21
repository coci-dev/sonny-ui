import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';

@Component({
  selector: 'docs-installation',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Installation</h1>
        <p class="text-muted-foreground mt-2">Get SonnyUI set up in your Angular project.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Prerequisites</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Angular 21 or later</li>
          <li>Tailwind CSS v4</li>
          <li>Node.js 22+</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Automatic Setup (Recommended)</h2>
        <p class="text-sm text-muted-foreground">
          Use the <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">ng add</code> schematic to configure everything automatically:
        </p>
        <docs-code-block [code]="ngAddCode" language="bash" />
        <p class="text-sm text-muted-foreground">
          This will install dependencies, add the theme CSS import, and configure Tailwind to scan SonnyUI classes.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Manual Setup</h2>

        <h3 class="text-lg font-medium">1. Install the package</h3>
        <docs-code-block [code]="installCode" language="bash" />

        <h3 class="text-lg font-medium">2. Import the theme CSS</h3>
        <p class="text-sm text-muted-foreground">Add the SonnyUI theme to your global stylesheet:</p>
        <docs-code-block [code]="cssImportCode" language="css" />

        <h3 class="text-lg font-medium">3. Add the Tailwind source directive</h3>
        <p class="text-sm text-muted-foreground">
          Tell Tailwind to scan SonnyUI component classes:
        </p>
        <docs-code-block [code]="tailwindSourceCode" language="css" />

        <h3 class="text-lg font-medium">4. Provide SonnyUI</h3>
        <p class="text-sm text-muted-foreground">Add the provider in your app config:</p>
        <docs-code-block [code]="providerCode" language="typescript" />
      </section>
    </div>
  `,
})
export class InstallationComponent {
  ngAddCode = `ng add @sonny-ui/core`;

  installCode = `npm install @sonny-ui/core`;

  cssImportCode = `@import "tailwindcss";
@import "@sonny-ui/core/styles/sonny-theme.css";`;

  tailwindSourceCode = `@source "../node_modules/@sonny-ui/core";`;

  providerCode = `import { provideSonnyUI } from '@sonny-ui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideSonnyUI({ defaultTheme: 'light' }),
  ],
};`;
}
