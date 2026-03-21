export const BUTTON_DOC_EN = {
  title: 'Button',
  description: 'Displays a button or a component that looks like a button.',
  examplesDesc: 'Real-world usage patterns with state management.',
  asyncSubmitButton: 'Async Submit Button',
  accessibility: [
    'Sets <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-disabled</code> when disabled or loading',
    'Sets <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tabindex="-1"</code> when disabled or loading',
    'Works with both <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;button&gt;</code> and <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;a&gt;</code> elements',
  ],
  propDescriptions: {
    variant: 'The visual style of the button.',
    size: 'The size of the button.',
    disabled: 'Whether the button is disabled.',
    loading: 'Whether the button is in a loading state.',
    class: 'Additional CSS classes to apply.',
  },
};
