import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyAvatarGroupComponent, type AvatarGroupItem } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { AVATAR_GROUP_DOC_EN } from '../../i18n/en/pages/avatar-group-doc';
import { AVATAR_GROUP_DOC_ES } from '../../i18n/es/pages/avatar-group-doc';

@Component({
  selector: 'docs-avatar-group-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyAvatarGroupComponent],
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
          <sny-avatar-group [items]="users" [max]="3" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Fallback Initials</h2>
        <docs-component-preview [code]="fallbackCode" language="markup">
          <sny-avatar-group [items]="initialsUsers" [max]="4" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode" language="markup">
          <div class="flex items-center gap-6">
            <sny-avatar-group [items]="users" [max]="3" size="sm" />
            <sny-avatar-group [items]="users" [max]="3" size="md" />
            <sny-avatar-group [items]="users" [max]="3" size="lg" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
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
export class AvatarGroupDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? AVATAR_GROUP_DOC_ES : AVATAR_GROUP_DOC_EN));

  users: AvatarGroupItem[] = [
    { src: 'https://i.pravatar.cc/80?img=1', alt: 'Alice' },
    { src: 'https://i.pravatar.cc/80?img=2', alt: 'Bob' },
    { src: 'https://i.pravatar.cc/80?img=3', alt: 'Carol' },
    { src: 'https://i.pravatar.cc/80?img=4', alt: 'David' },
    { src: 'https://i.pravatar.cc/80?img=5', alt: 'Eve' },
  ];

  initialsUsers: AvatarGroupItem[] = [
    { fallback: 'AJ' },
    { fallback: 'BS' },
    { fallback: 'CW' },
    { fallback: 'DB' },
    { fallback: 'ED' },
    { fallback: 'FW' },
  ];

  importCode = `import { SnyAvatarGroupComponent, type AvatarGroupItem } from '@sonny-ui/core';`;

  basicCode = `users: AvatarGroupItem[] = [
  { src: 'user1.jpg', alt: 'Alice' },
  { src: 'user2.jpg', alt: 'Bob' },
  { src: 'user3.jpg', alt: 'Carol' },
  { src: 'user4.jpg', alt: 'David' },
  { src: 'user5.jpg', alt: 'Eve' },
];

<sny-avatar-group [items]="users" [max]="3" />`;

  fallbackCode = `users: AvatarGroupItem[] = [
  { fallback: 'AJ' },
  { fallback: 'BS' },
  { fallback: 'CW' },
];

<sny-avatar-group [items]="users" [max]="4" />`;

  sizesCode = `<sny-avatar-group [items]="users" size="sm" />
<sny-avatar-group [items]="users" size="md" />
<sny-avatar-group [items]="users" size="lg" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'items', type: 'AvatarGroupItem[]', default: '(required)', description: this.t().propDescriptions.items },
    { name: 'max', type: 'number', default: '3', description: this.t().propDescriptions.max },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'spacing', type: "'tight' | 'normal'", default: "'normal'", description: this.t().propDescriptions.spacing },
  ]);
}
