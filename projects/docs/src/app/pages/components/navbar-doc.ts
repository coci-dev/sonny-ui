import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyNavbarDirective,
  SnyNavbarBrandDirective,
  SnyNavbarContentDirective,
  SnyNavbarEndDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { NAVBAR_DOC_EN } from '../../i18n/en/pages/navbar-doc';
import { NAVBAR_DOC_ES } from '../../i18n/es/pages/navbar-doc';

@Component({
  selector: 'docs-navbar-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyNavbarDirective,
    SnyNavbarBrandDirective,
    SnyNavbarContentDirective,
    SnyNavbarEndDirective,
  ],
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
          <nav snyNavbar>
            <div snyNavbarBrand>MyApp</div>
            <div snyNavbarContent>
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
            <div snyNavbarEnd>
              <a href="#">Login</a>
            </div>
          </nav>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">Bordered</h3>
        <docs-component-preview [code]="borderedCode" language="markup">
          <nav snyNavbar variant="bordered">
            <div snyNavbarBrand>MyApp</div>
            <div snyNavbarContent>
              <a href="#">Home</a>
              <a href="#">About</a>
            </div>
            <div snyNavbarEnd>
              <a href="#">Login</a>
            </div>
          </nav>
        </docs-component-preview>
        <h3 class="text-lg font-medium">Floating</h3>
        <docs-component-preview [code]="floatingCode" language="markup">
          <nav snyNavbar variant="floating" class="w-full">
            <div snyNavbarBrand>MyApp</div>
            <div snyNavbarContent>
              <a href="#">Home</a>
              <a href="#">About</a>
            </div>
            <div snyNavbarEnd>
              <a href="#">Login</a>
            </div>
          </nav>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().navbar }}</h3>
        <docs-props-table [props]="navbarProps()" />
      </section>
    </div>
  `,
})
export class NavbarDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? NAVBAR_DOC_ES : NAVBAR_DOC_EN);

  importCode = `import {
  SnyNavbarDirective,
  SnyNavbarBrandDirective,
  SnyNavbarContentDirective,
  SnyNavbarEndDirective,
} from '@sonny-ui/core';`;

  basicCode = `<nav snyNavbar>
  <div snyNavbarBrand>MyApp</div>
  <div snyNavbarContent>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
  <div snyNavbarEnd>
    <a href="#">Login</a>
  </div>
</nav>`;

  borderedCode = `<nav snyNavbar variant="bordered">
  <div snyNavbarBrand>MyApp</div>
  <div snyNavbarContent>
    <a href="#">Home</a>
    <a href="#">About</a>
  </div>
  <div snyNavbarEnd>
    <a href="#">Login</a>
  </div>
</nav>`;

  floatingCode = `<nav snyNavbar variant="floating">
  <div snyNavbarBrand>MyApp</div>
  <div snyNavbarContent>
    <a href="#">Home</a>
    <a href="#">About</a>
  </div>
  <div snyNavbarEnd>
    <a href="#">Login</a>
  </div>
</nav>`;

  readonly navbarProps = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'floating' | 'bordered'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'sticky', type: 'boolean', default: 'false', description: this.t().propDescriptions.sticky },
    { name: 'ariaLabel', type: 'string', default: "'Main navigation'", description: this.t().propDescriptions.ariaLabel },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
