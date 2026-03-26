import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyButtonDirective, SnyLoaderComponent, type ButtonVariant, type ButtonSize } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { BUTTON_DOC_EN } from '../../i18n/en/pages/button-doc';
import { BUTTON_DOC_ES } from '../../i18n/es/pages/button-doc';

@Component({
  selector: 'docs-button-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyButtonDirective, SnyLoaderComponent],
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
        <docs-component-preview [code]="basicCode">
          <button snyBtn>Click me</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          @for (v of variants; track v) {
            <button snyBtn [variant]="v">{{ v }}</button>
          }
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          @for (s of sizes; track s) {
            <button snyBtn [size]="s">{{ s }}</button>
          }
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.states }}</h2>
        <docs-component-preview [code]="statesCode">
          <button snyBtn [disabled]="true">Disabled</button>
          <button snyBtn [loading]="true">
            <sny-loader variant="spinner" size="sm" />
            Loading
          </button>
          <button snyBtn [loading]="true">
            <sny-loader variant="dots" size="sm" />
            Loading dots
          </button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.asLink }}</h2>
        <docs-component-preview [code]="linkCode">
          <a snyBtn variant="link" href="#">Link Button</a>
          <a snyBtn variant="outline" href="#">Outline Link</a>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().examplesDesc }}</p>

        <h3 class="text-lg font-medium">{{ t().asyncSubmitButton }}</h3>
        <docs-component-preview [code]="asyncButtonCode" language="typescript">
          <div class="flex items-center gap-4">
            <button snyBtn [loading]="saving()" [disabled]="saving()" (click)="handleSave()">
              {{ saving() ? 'Saving...' : saved() ? 'Saved!' : 'Save Changes' }}
            </button>
            <button snyBtn variant="outline" [disabled]="saving()" (click)="reset()">Reset</button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="buttonProps()" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.accessibility }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().accessibility; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class ButtonDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? BUTTON_DOC_ES : BUTTON_DOC_EN);

  variants: ButtonVariant[] = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
  sizes: ButtonSize[] = ['sm', 'md', 'lg', 'icon'];

  importCode = `import { SnyButtonDirective } from '@sonny-ui/core';`;

  basicCode = `<button snyBtn>Click me</button>`;

  variantsCode = `<button snyBtn>Default</button>
<button snyBtn variant="destructive">Destructive</button>
<button snyBtn variant="outline">Outline</button>
<button snyBtn variant="secondary">Secondary</button>
<button snyBtn variant="ghost">Ghost</button>
<button snyBtn variant="link">Link</button>`;

  sizesCode = `<button snyBtn size="sm">Small</button>
<button snyBtn size="md">Medium</button>
<button snyBtn size="lg">Large</button>
<button snyBtn size="icon">...</button>`;

  statesCode = `<button snyBtn [disabled]="true">Disabled</button>

<button snyBtn [loading]="isLoading()">
  @if (isLoading()) { <sny-loader variant="spinner" size="sm" /> }
  Save
</button>`;

  linkCode = `<a snyBtn variant="link" href="#">Link Button</a>
<a snyBtn variant="outline" href="#">Outline Link</a>`;

  // Examples state
  readonly saving = signal(false);
  readonly saved = signal(false);

  async handleSave() {
    this.saving.set(true);
    this.saved.set(false);
    await new Promise(r => setTimeout(r, 2000));
    this.saving.set(false);
    this.saved.set(true);
  }

  reset() {
    this.saved.set(false);
  }

  asyncButtonCode = `@Component({
  imports: [SnyButtonDirective],
  template: \`
    <button snyBtn [loading]="saving()" [disabled]="saving()" (click)="handleSave()">
      {{ saving() ? 'Saving...' : saved() ? 'Saved!' : 'Save Changes' }}
    </button>
  \`,
})
export class SaveButtonExample {
  readonly saving = signal(false);
  readonly saved = signal(false);

  async handleSave() {
    this.saving.set(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.saving.set(false);
    this.saved.set(true);
  }
}`;

  readonly buttonProps = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'loading', type: 'boolean', default: 'false', description: this.t().propDescriptions.loading },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
