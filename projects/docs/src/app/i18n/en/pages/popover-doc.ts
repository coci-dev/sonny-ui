export const POPOVER_DOC_EN = {
  title: 'Popover',
  description: 'A floating panel anchored to a trigger element with click-to-open, positioning, and click-outside/escape handling.',
  matchWidth: 'Match Trigger Width',
  matchWidthDesc: 'The popover panel matches the width of the trigger element.',
  programmatic: 'Programmatic Control',
  programmaticDesc: 'Use a template reference to open/close the popover from any element.',
  formContent: 'Form Content',
  formContentDesc: 'Popovers can contain any content including form inputs.',
  accessibility: [
    'Trigger has <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-expanded</code> and <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-haspopup="dialog"</code>.',
    'Content panel has <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="dialog"</code>.',
    'Escape key closes the popover.',
    'Click outside closes the popover.',
    'Scroll and resize reposition the panel.',
  ],
  propDescriptions: {
    matchWidth: 'Match the panel width to the trigger width.',
    offset: 'Gap in pixels between trigger and panel.',
    closeOnOutside: 'Close when clicking outside the popover.',
    closeOnEscape: 'Close when pressing Escape.',
    isOpen: 'Signal indicating the open state.',
  },
};
