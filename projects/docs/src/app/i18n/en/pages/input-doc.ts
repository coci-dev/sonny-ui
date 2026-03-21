export const INPUT_DOC_EN = {
  title: 'Input',
  description: 'Displays a form input field.',
  withLabel: 'With Label',
  disabled: 'Disabled',
  examplesDesc: 'Real-world usage patterns with state management.',
  formWithReactiveValidation: 'Form with Reactive Validation',
  snyInputDirective: 'SnyInputDirective',
  snyLabelDirective: 'SnyLabelDirective',
  accessibility: [
    'Sets <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-invalid</code> when variant is "error"',
    'Supports <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-describedby</code> for error messages',
    'Works with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;input&gt;</code> and <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;textarea&gt;</code>',
  ],
  propDescriptions: {
    variant: 'The visual state of the input.',
    inputSize: 'The size of the input.',
    ariaDescribedBy: 'ID of the element describing the input.',
    class: 'Additional CSS classes to apply.',
  },
  labelPropDescriptions: {
    variant: 'Matches the input variant for consistent styling.',
    class: 'Additional CSS classes to apply.',
  },
};
