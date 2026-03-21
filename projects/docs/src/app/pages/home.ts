import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  SnyButtonDirective,
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardDescriptionDirective,
  SnyCardContentDirective,
  SnyInputDirective,
} from 'core';
import { CodeBlockComponent } from '../shared/code-block';

@Component({
  selector: 'docs-home',
  standalone: true,
  imports: [
    RouterLink,
    SnyButtonDirective,
    SnyCardDirective,
    SnyCardHeaderDirective,
    SnyCardTitleDirective,
    SnyCardDescriptionDirective,
    SnyCardContentDirective,
    SnyInputDirective,
    CodeBlockComponent,
  ],
  template: `
    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
      <div class="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32 lg:py-40">
        <img src="logo.png" alt="SonnyUI Logo" class="mx-auto h-24 sm:h-32 w-auto mb-8" />
        <h1 class="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          <span class="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">SonnyUI</span>
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Beautiful, accessible Angular components built with Tailwind CSS v4 and Signals.
          Copy-paste or install — you own the code.
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">Angular 21+</span>
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">Tailwind v4</span>
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">Zoneless</span>
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">Signals</span>
          <span class="rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-600 px-3 py-1 font-medium">Alpha</span>
        </div>
        <div class="mt-8 flex items-center justify-center gap-4">
          <a snyBtn size="lg" routerLink="/docs/getting-started/installation">Get Started</a>
          <a snyBtn variant="outline" size="lg" routerLink="/docs/components/button">View Components</a>
        </div>
        <div class="mx-auto mt-8 max-w-md">
          <div class="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm font-mono text-muted-foreground">
            <span class="select-none text-primary">$</span>
            <span class="flex-1 text-left">ng add &#64;sonny-ui/core</span>
            <button
              class="rounded-sm p-1 text-muted-foreground hover:text-foreground transition-colors"
              (click)="copyInstall()"
            >
              {{ installCopied() ? '✓' : '⧉' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- What It Solves -->
    <section class="border-b border-border bg-muted/30">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <h2 class="text-center text-3xl font-bold tracking-tight">What It Solves</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Common problems, elegant solutions.</p>
        <div class="mt-12 grid gap-6 sm:grid-cols-3">
          @for (item of problems; track item.problem) {
            <div snyCard padding="md" class="text-center">
              <p class="text-sm font-medium text-destructive/80 line-through">{{ item.problem }}</p>
              <div class="my-3 text-2xl">↓</div>
              <p class="text-sm font-semibold text-primary">{{ item.solution }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="border-b border-border">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <h2 class="text-center text-3xl font-bold tracking-tight">Why SonnyUI?</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Everything you need to build modern Angular apps.</p>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (feature of features; track feature.title) {
            <div snyCard class="p-0">
              <div snyCardHeader>
                <div class="flex items-center gap-3">
                  <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg">{{ feature.icon }}</span>
                  <h3 snyCardTitle class="text-base">{{ feature.title }}</h3>
                </div>
                <p snyCardDescription class="mt-2">{{ feature.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Component Showcase -->
    <section class="border-b border-border bg-muted/30">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <h2 class="text-center text-3xl font-bold tracking-tight">Component Showcase</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Real components, live in the browser.</p>
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Buttons -->
          <div snyCard padding="md" class="space-y-4">
            <h3 class="text-sm font-semibold text-muted-foreground">Buttons</h3>
            <div class="flex flex-wrap gap-2">
              <button snyBtn size="sm">Default</button>
              <button snyBtn variant="secondary" size="sm">Secondary</button>
              <button snyBtn variant="outline" size="sm">Outline</button>
              <button snyBtn variant="destructive" size="sm">Destructive</button>
              <button snyBtn variant="ghost" size="sm">Ghost</button>
            </div>
          </div>

          <!-- Card -->
          <div snyCard padding="md" class="space-y-4">
            <h3 class="text-sm font-semibold text-muted-foreground">Card</h3>
            <div snyCard variant="outline" class="p-0">
              <div snyCardHeader>
                <h4 snyCardTitle class="text-sm">Nested Card</h4>
                <p snyCardDescription>With header and content.</p>
              </div>
              <div snyCardContent>
                <p class="text-xs text-muted-foreground">Composable card directives.</p>
              </div>
            </div>
          </div>

          <!-- Input -->
          <div snyCard padding="md" class="space-y-4">
            <h3 class="text-sm font-semibold text-muted-foreground">Input</h3>
            <div class="space-y-2">
              <input snyInput placeholder="Default input" />
              <input snyInput variant="error" placeholder="Error state" />
            </div>
          </div>
        </div>
        <div class="mt-8 text-center">
          <a snyBtn variant="outline" routerLink="/docs/components/button">
            See all components →
          </a>
        </div>
      </div>
    </section>

    <!-- Quick Start -->
    <section class="border-b border-border">
      <div class="mx-auto max-w-4xl px-6 py-20">
        <h2 class="text-center text-3xl font-bold tracking-tight">Quick Start</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Get up and running in 3 steps.</p>
        <div class="mt-12 space-y-6">
          <div class="space-y-2">
            <h3 class="text-sm font-semibold">1. Install</h3>
            <docs-code-block [code]="installCode" language="bash" />
          </div>
          <div class="space-y-2">
            <h3 class="text-sm font-semibold">2. Import</h3>
            <docs-code-block [code]="importCode" language="typescript" />
          </div>
          <div class="space-y-2">
            <h3 class="text-sm font-semibold">3. Use</h3>
            <docs-code-block [code]="useCode" language="markup" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer CTA -->
    <section>
      <div class="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 class="text-3xl font-bold tracking-tight">Ready to build?</h2>
        <p class="mx-auto mt-3 max-w-xl text-muted-foreground">
          Start building beautiful Angular apps with SonnyUI today.
        </p>
        <div class="mt-8 flex items-center justify-center gap-4">
          <a snyBtn size="lg" routerLink="/docs/getting-started/installation">Read the Docs</a>
          <a snyBtn variant="outline" size="lg" href="https://github.com/coci-dev/sonny-ui" target="_blank" rel="noopener">
            GitHub
          </a>
        </div>
        <p class="mt-6 text-xs text-muted-foreground">v0.1.0-alpha.1 · MIT License · This is an alpha release — APIs may change.</p>
      </div>
    </section>
  `,
})
export class HomeComponent {
  readonly installCopied = signal(false);

  problems = [
    { problem: 'Boilerplate Components', solution: 'Copy & paste or ng add, own your code' },
    { problem: 'Zone.js Overhead', solution: '100% zoneless, signal-first architecture' },
    { problem: 'Theme Inconsistency', solution: '3 built-in themes + CSS variables for custom themes' },
  ];

  features = [
    { icon: '⚡', title: 'Signal-First API', description: 'Every component uses Angular Signals for reactive, fine-grained updates with zero overhead.' },
    { icon: '🎨', title: 'Three Themes', description: 'Light, dark, and corporate themes out of the box. Create custom themes with CSS variables.' },
    { icon: '📋', title: 'Copy & Paste', description: 'Own the code. Copy components directly into your project or install via npm.' },
    { icon: '♿', title: 'Accessible', description: 'Built with ARIA attributes, keyboard navigation, and screen reader support.' },
    { icon: '🌊', title: 'Tailwind CSS v4', description: 'Styled with Tailwind v4 utility classes and CSS-first configuration.' },
    { icon: '🚀', title: 'Zoneless Performance', description: 'Designed for zoneless Angular. No zone.js dependency, maximum performance.' },
  ];

  installCode = `ng add @sonny-ui/core`;
  importCode = `import { SnyButtonDirective } from '@sonny-ui/core';`;
  useCode = `<button snyBtn variant="default">Click me</button>
<button snyBtn variant="outline">Outline</button>
<button snyBtn variant="destructive">Delete</button>`;

  copyInstall(): void {
    navigator.clipboard.writeText('ng add @sonny-ui/core');
    this.installCopied.set(true);
    setTimeout(() => this.installCopied.set(false), 2000);
  }
}
