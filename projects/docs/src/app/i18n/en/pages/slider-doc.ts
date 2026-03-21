export const SLIDER_DOC_EN = {
  title: 'Slider',
  description: 'An input where the user selects a value from within a given range.',
  volumeControl: 'Volume Control',
  accessibility: [
    'Uses native <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="slider"</code> with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-valuenow</code>, <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-valuemin</code>, and <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-valuemax</code>.',
    'Supports keyboard interaction with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Arrow</code> keys for fine adjustments.',
    'Disabled state is conveyed via <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-disabled</code>.',
  ],
  propDescriptions: {
    value: 'Current value. Supports two-way binding.',
    min: 'Minimum value.',
    max: 'Maximum value.',
    step: 'Step increment.',
    disabled: 'Whether the slider is disabled.',
    size: 'The size of the slider.',
  },
};
