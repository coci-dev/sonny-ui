export const RADIO_DOC_EN = {
  title: 'Radio',
  description: 'A control that allows the user to select one option from a set.',
  accessibility: [
    'Uses native <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;input type="radio"&gt;</code> for full screen reader support.',
    'Radio buttons with the same <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">name</code> attribute form an accessible group.',
    'Supports keyboard navigation with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Arrow</code> keys within a group.',
  ],
  propDescriptions: {
    size: 'The size of the radio button.',
    class: 'Additional CSS classes to apply.',
  },
};
