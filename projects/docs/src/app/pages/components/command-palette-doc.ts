import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyCommandPaletteService, SnyButtonDirective, ThemeService, type Command, type Theme } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { COMMAND_PALETTE_DOC_EN } from '../../i18n/en/pages/command-palette-doc';
import { COMMAND_PALETTE_DOC_ES } from '../../i18n/es/pages/command-palette-doc';

@Component({
  selector: 'docs-command-palette-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyButtonDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.import }}</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.usage }}</h2>
        <docs-component-preview [code]="basicCode" language="markup">
          <button snyBtn (click)="openBasic()">Open Command Palette</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().fullExample }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().fullExampleDesc }}</p>
        <docs-component-preview [code]="fullCode" language="typescript">
          <div class="space-y-3 text-center">
            <button snyBtn (click)="openFull()">Open Full Palette</button>
            <p class="text-sm text-muted-foreground">Or press <kbd class="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">Ctrl+K</kbd></p>
            @if (lastAction()) {
              <p class="text-sm text-muted-foreground">Last action: {{ lastAction() }}</p>
            }
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">CommandPaletteConfig</h3>
        <docs-props-table [props]="configProps()" />
        <h3 class="text-lg font-medium mt-4">Command</h3>
        <docs-props-table [props]="commandProps()" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.accessibility }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().accessibility; track item) {
            <li>{{ item }}</li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class CommandPaletteDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? COMMAND_PALETTE_DOC_ES : COMMAND_PALETTE_DOC_EN));
  private readonly palette = inject(SnyCommandPaletteService);
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  readonly lastAction = signal('');

  basicCommands: Command[] = [
    { id: '1', label: 'Say Hello', action: () => this.lastAction.set('Hello!') },
    { id: '2', label: 'Say Goodbye', action: () => this.lastAction.set('Goodbye!') },
  ];

  fullCommands: Command[] = [
    { id: 'light', label: 'Light Theme', group: 'Theme', icon: '☀️', action: () => { this.themeService.setTheme('light'); this.lastAction.set('Theme → Light'); } },
    { id: 'dark', label: 'Dark Theme', group: 'Theme', icon: '🌙', action: () => { this.themeService.setTheme('dark'); this.lastAction.set('Theme → Dark'); } },
    { id: 'corporate', label: 'Corporate Theme', group: 'Theme', icon: '🏢', action: () => { this.themeService.setTheme('corporate' as Theme); this.lastAction.set('Theme → Corporate'); } },
    { id: 'home', label: 'Go to Home', group: 'Navigation', shortcut: 'Ctrl+H', action: () => { this.router.navigate(['/']); this.lastAction.set('Navigated → Home'); } },
    { id: 'install', label: 'Installation Guide', group: 'Navigation', description: 'Getting started with SonnyUI', action: () => { this.router.navigate(['/docs/getting-started/installation']); this.lastAction.set('Navigated → Installation'); } },
    { id: 'copy', label: 'Copy Current URL', group: 'Actions', shortcut: 'Ctrl+Shift+C', keywords: ['clipboard', 'link', 'share'], action: () => { navigator.clipboard.writeText(location.href); this.lastAction.set('URL copied!'); } },
    { id: 'alert', label: 'Show Alert', group: 'Actions', icon: '🔔', action: () => this.lastAction.set('Alert triggered!') },
  ];

  openBasic(): void {
    this.palette.open({ commands: this.basicCommands, placeholder: 'Search commands...' });
  }

  openFull(): void {
    this.palette.open({ commands: this.fullCommands });
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKey(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.openFull();
    }
  }

  importCode = `import { SnyCommandPaletteService, type Command } from '@sonny-ui/core';`;

  basicCode = `<button snyBtn (click)="openPalette()">Open Command Palette</button>`;

  fullCode = `import { Component, inject, HostListener, signal } from '@angular/core';
import { SnyCommandPaletteService, type Command } from '@sonny-ui/core';

@Component({
  template: \\\`
    <button (click)="open()">Open Palette</button>
    <p>Or press Ctrl+K</p>
  \\\`,
})
export class MyComponent {
  private palette = inject(SnyCommandPaletteService);
  readonly lastAction = signal('');

  commands: Command[] = [
    { id: 'light', label: 'Light Theme', group: 'Theme', icon: '☀️',
      action: () => this.lastAction.set('Light!') },
    { id: 'dark', label: 'Dark Theme', group: 'Theme', icon: '🌙',
      action: () => this.lastAction.set('Dark!') },
    { id: 'copy', label: 'Copy URL', shortcut: 'Ctrl+C',
      keywords: ['clipboard'],
      action: () => navigator.clipboard.writeText(location.href) },
  ];

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      this.open();
    }
  }

  open() {
    this.palette.open({ commands: this.commands });
  }
}`;

  readonly configProps = computed<PropDef[]>(() => [
    { name: 'commands', type: 'Command[]', default: '(required)', description: this.t().propDescriptions.commands },
    { name: 'placeholder', type: 'string', default: "'Type a command...'", description: this.t().propDescriptions.placeholder },
    { name: 'emptyText', type: 'string', default: "'No results found.'", description: this.t().propDescriptions.emptyText },
    { name: 'width', type: 'string', default: "'32rem'", description: this.t().propDescriptions.width },
  ]);

  readonly commandProps = computed<PropDef[]>(() => [
    { name: 'id', type: 'string', default: '(required)', description: 'Unique identifier for the command.' },
    { name: 'label', type: 'string', default: '(required)', description: 'Display label for the command.' },
    { name: 'action', type: '() => void', default: '(required)', description: 'Function executed when the command is selected.' },
    { name: 'description', type: 'string', default: 'undefined', description: 'Secondary description text.' },
    { name: 'icon', type: 'string', default: 'undefined', description: 'Icon (emoji or SVG string).' },
    { name: 'group', type: 'string', default: 'undefined', description: 'Group name for categorization.' },
    { name: 'keywords', type: 'string[]', default: 'undefined', description: 'Additional search keywords.' },
    { name: 'shortcut', type: 'string', default: 'undefined', description: 'Keyboard shortcut hint (visual only).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Exclude from search results.' },
  ]);
}
