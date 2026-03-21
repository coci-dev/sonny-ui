import { Component, signal, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyAvatarComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { AVATAR_DOC_EN } from '../../i18n/en/pages/avatar-doc';
import { AVATAR_DOC_ES } from '../../i18n/es/pages/avatar-doc';

@Component({
  selector: 'docs-avatar-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyAvatarComponent],
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
          <div class="flex items-center gap-4">
            <sny-avatar alt="John Doe" fallback="JD" />
            <sny-avatar src="https://i.pravatar.cc/150?u=jane" alt="Jane Smith" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="flex items-center gap-4">
            <sny-avatar size="sm" alt="SM" fallback="SM" />
            <sny-avatar size="md" alt="MD" fallback="MD" />
            <sny-avatar size="lg" alt="LG" fallback="LG" />
            <sny-avatar size="xl" alt="XL" fallback="XL" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="flex items-center gap-4">
            <sny-avatar variant="circle" alt="Circle" fallback="C" />
            <sny-avatar variant="rounded" alt="Rounded" fallback="R" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().userList }}</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-3 max-w-sm">
            @for (user of users; track user.name) {
              <div class="flex items-center gap-3">
                <sny-avatar
                  [src]="showImages() ? user.avatar : ''"
                  [alt]="user.name"
                />
                <div>
                  <p class="text-sm font-medium">{{ user.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ user.role }}</p>
                </div>
              </div>
            }
            <button
              class="text-xs text-muted-foreground hover:text-foreground underline"
              (click)="showImages.set(!showImages())"
            >
              {{ showImages() ? 'Hide images (show fallback)' : 'Show images' }}
            </button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
      </section>
    </div>
  `,
})
export class AvatarDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? AVATAR_DOC_ES : AVATAR_DOC_EN);

  readonly showImages = signal(true);

  users = [
    { name: 'Alice Johnson', role: 'Engineer', avatar: 'https://i.pravatar.cc/150?u=alice' },
    { name: 'Bob Smith', role: 'Designer', avatar: 'https://i.pravatar.cc/150?u=bob' },
    { name: 'Carol White', role: 'Manager', avatar: 'https://i.pravatar.cc/150?u=carol' },
  ];

  importCode = `import { SnyAvatarComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-avatar alt="John Doe" fallback="JD" />
<sny-avatar src="https://example.com/avatar.jpg" alt="Jane" />`;
  sizesCode = `<sny-avatar size="sm" fallback="SM" />
<sny-avatar size="md" fallback="MD" />
<sny-avatar size="lg" fallback="LG" />
<sny-avatar size="xl" fallback="XL" />`;
  variantsCode = `<sny-avatar variant="circle" fallback="C" />
<sny-avatar variant="rounded" fallback="R" />`;
  exampleCode = `readonly showImages = signal(true);

<sny-avatar
  [src]="showImages() ? user.avatar : ''"
  [alt]="user.name"
/>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'src', type: 'string', default: "''", description: this.t().propDescriptions.src },
    { name: 'alt', type: 'string', default: "''", description: this.t().propDescriptions.alt },
    { name: 'fallback', type: 'string', default: "''", description: this.t().propDescriptions.fallback },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'variant', type: "'circle' | 'rounded'", default: "'circle'", description: this.t().propDescriptions.variant },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
