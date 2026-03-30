export const AVATAR_GROUP_DOC_EN = {
  title: 'Avatar Group',
  description: 'A stacked group of avatars with overflow counter, supporting images and fallback initials.',
  accessibility: [
    'Group container has <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="group"</code> with aria-label.',
    'Images have alt attributes for screen readers.',
  ],
  propDescriptions: {
    items: 'Array of avatar items with src, alt, and/or fallback initials.',
    max: 'Maximum number of visible avatars.',
    size: 'Avatar size: sm, md, or lg.',
    spacing: 'Overlap spacing: tight or normal.',
  },
};
