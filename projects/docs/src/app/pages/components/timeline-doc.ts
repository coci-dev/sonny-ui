import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyTimelineDirective,
  SnyTimelineItemDirective,
  SnyTimelineStartDirective,
  SnyTimelineMiddleDirective,
  SnyTimelineEndDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { TIMELINE_DOC_EN } from '../../i18n/en/pages/timeline-doc';
import { TIMELINE_DOC_ES } from '../../i18n/es/pages/timeline-doc';

@Component({
  selector: 'docs-timeline-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyTimelineDirective,
    SnyTimelineItemDirective,
    SnyTimelineStartDirective,
    SnyTimelineMiddleDirective,
    SnyTimelineEndDirective,
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
          <div snyTimeline class="max-w-md">
            <div snyTimelineItem>
              <div snyTimelineStart>2024</div>
              <div snyTimelineMiddle></div>
              <div snyTimelineEnd>
                <h3 class="font-medium">Project Started</h3>
                <p class="text-sm text-muted-foreground">Initial planning and setup.</p>
              </div>
            </div>
            <div snyTimelineItem>
              <div snyTimelineStart>2025</div>
              <div snyTimelineMiddle variant="primary"></div>
              <div snyTimelineEnd>
                <h3 class="font-medium">Beta Release</h3>
                <p class="text-sm text-muted-foreground">First public beta launched.</p>
              </div>
            </div>
            <div snyTimelineItem>
              <div snyTimelineStart>2026</div>
              <div snyTimelineMiddle variant="success"></div>
              <div snyTimelineEnd>
                <h3 class="font-medium">Stable Release</h3>
                <p class="text-sm text-muted-foreground">Version 1.0 released.</p>
              </div>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">SnyTimelineDirective</h3>
        <docs-props-table [props]="timelineProps()" />
        <h3 class="text-lg font-medium mt-4">SnyTimelineItemDirective</h3>
        <docs-props-table [props]="itemProps()" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().subDirectivesTitle }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().subDirectives; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class TimelineDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? TIMELINE_DOC_ES : TIMELINE_DOC_EN);

  importCode = `import {
  SnyTimelineDirective,
  SnyTimelineItemDirective,
  SnyTimelineStartDirective,
  SnyTimelineMiddleDirective,
  SnyTimelineEndDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyTimeline>
  <div snyTimelineItem>
    <div snyTimelineStart>2024</div>
    <div snyTimelineMiddle></div>
    <div snyTimelineEnd>
      <h3 class="font-medium">Project Started</h3>
      <p class="text-sm text-muted-foreground">Initial planning and setup.</p>
    </div>
  </div>
  <div snyTimelineItem>
    <div snyTimelineStart>2025</div>
    <div snyTimelineMiddle variant="primary"></div>
    <div snyTimelineEnd>
      <h3 class="font-medium">Beta Release</h3>
    </div>
  </div>
</div>`;

  readonly timelineProps = computed<PropDef[]>(() => [
    { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: this.t().propDescriptions.orientation },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly itemProps = computed<PropDef[]>(() => [
    { name: 'connect', type: "'start' | 'end' | 'both' | 'none'", default: "'both'", description: this.t().itemPropDescriptions.connect },
    { name: 'class', type: 'string', default: "''", description: this.t().itemPropDescriptions.class },
  ]);
}
