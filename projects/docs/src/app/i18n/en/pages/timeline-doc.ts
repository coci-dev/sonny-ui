export const TIMELINE_DOC_EN = {
  title: 'Timeline',
  description: 'Displays a chronological sequence of events in a vertical layout.',
  subDirectivesTitle: 'Sub-directives',
  subDirectives: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTimelineItem</code> — Individual timeline entry',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTimelineStart</code> — Left-side content (e.g. date/time)',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTimelineMiddle</code> — Center connector with icon',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTimelineEnd</code> — Right-side content (e.g. description)',
  ],
  propDescriptions: {
    orientation: 'Layout direction of the timeline.',
    class: 'Additional CSS classes to apply.',
  },
  itemPropDescriptions: {
    connect: 'Which connecting lines to display.',
    class: 'Additional CSS classes to apply.',
  },
};
