import { Component, computed, inject, signal } from '@angular/core';
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
import { I18nService } from '../i18n/i18n.service';
import { HOME_EN } from '../i18n/en/home';
import { HOME_ES } from '../i18n/es/home';

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
          <span class="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">{{ t().hero.title }}</span>
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {{ t().hero.description }}
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">{{ t().badges.angular }}</span>
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">{{ t().badges.tailwind }}</span>
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">{{ t().badges.zoneless }}</span>
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">{{ t().badges.signals }}</span>
          <span class="rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-600 px-3 py-1 font-medium">{{ t().badges.alpha }}</span>
        </div>
        <div class="mt-8 flex items-center justify-center gap-4">
          <a snyBtn size="lg" [routerLink]="i18n.localizeLink('/docs/getting-started/installation')">{{ t().hero.getStarted }}</a>
          <a snyBtn variant="outline" size="lg" [routerLink]="i18n.localizeLink('/docs/components/button')">{{ t().hero.viewComponents }}</a>
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
        <h2 class="text-center text-3xl font-bold tracking-tight">{{ t().whatItSolves.title }}</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{{ t().whatItSolves.subtitle }}</p>
        <div class="mt-12 grid gap-6 sm:grid-cols-3">
          @for (item of t().problems; track item.problem) {
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
        <h2 class="text-center text-3xl font-bold tracking-tight">{{ t().whySonnyUI.title }}</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{{ t().whySonnyUI.subtitle }}</p>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (feature of t().features; track feature.title) {
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
        <h2 class="text-center text-3xl font-bold tracking-tight">{{ t().showcase.title }}</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{{ t().showcase.subtitle }}</p>
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Buttons -->
          <div snyCard padding="md" class="space-y-4">
            <h3 class="text-sm font-semibold text-muted-foreground">{{ t().showcase.buttons }}</h3>
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
            <h3 class="text-sm font-semibold text-muted-foreground">{{ t().showcase.card }}</h3>
            <div snyCard variant="outline" class="p-0">
              <div snyCardHeader>
                <h4 snyCardTitle class="text-sm">{{ t().showcase.nestedCard }}</h4>
                <p snyCardDescription>{{ t().showcase.nestedCardDesc }}</p>
              </div>
              <div snyCardContent>
                <p class="text-xs text-muted-foreground">{{ t().showcase.composableCardDirectives }}</p>
              </div>
            </div>
          </div>

          <!-- Input -->
          <div snyCard padding="md" class="space-y-4">
            <h3 class="text-sm font-semibold text-muted-foreground">{{ t().showcase.input }}</h3>
            <div class="space-y-2">
              <input snyInput [placeholder]="t().showcase.defaultInput" />
              <input snyInput variant="error" [placeholder]="t().showcase.errorState" />
            </div>
          </div>
        </div>
        <div class="mt-8 text-center">
          <a snyBtn variant="outline" [routerLink]="i18n.localizeLink('/docs/components/button')">
            {{ t().showcase.seeAll }}
          </a>
        </div>
      </div>
    </section>

    <!-- Quick Start -->
    <section class="border-b border-border">
      <div class="mx-auto max-w-4xl px-6 py-20">
        <h2 class="text-center text-3xl font-bold tracking-tight">{{ t().quickStart.title }}</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{{ t().quickStart.subtitle }}</p>
        <div class="mt-12 space-y-6">
          <div class="space-y-2">
            <h3 class="text-sm font-semibold">{{ t().quickStart.step1 }}</h3>
            <docs-code-block [code]="installCode" language="bash" />
          </div>
          <div class="space-y-2">
            <h3 class="text-sm font-semibold">{{ t().quickStart.step2 }}</h3>
            <docs-code-block [code]="importCode" language="typescript" />
          </div>
          <div class="space-y-2">
            <h3 class="text-sm font-semibold">{{ t().quickStart.step3 }}</h3>
            <docs-code-block [code]="useCode" language="markup" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer CTA -->
    <section>
      <div class="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 class="text-3xl font-bold tracking-tight">{{ t().footer.title }}</h2>
        <p class="mx-auto mt-3 max-w-xl text-muted-foreground">
          {{ t().footer.subtitle }}
        </p>
        <div class="mt-8 flex items-center justify-center gap-4">
          <a snyBtn size="lg" [routerLink]="i18n.localizeLink('/docs/getting-started/installation')">{{ t().footer.readDocs }}</a>
          <a snyBtn variant="outline" size="lg" href="https://github.com/coci-dev/sonny-ui" target="_blank" rel="noopener">
            {{ t().footer.github }}
          </a>
        </div>
        <p class="mt-6 text-xs text-muted-foreground">{{ t().footer.version }}</p>
      </div>
    </section>
  `,
})
export class HomeComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? HOME_ES : HOME_EN);
  readonly installCopied = signal(false);

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
