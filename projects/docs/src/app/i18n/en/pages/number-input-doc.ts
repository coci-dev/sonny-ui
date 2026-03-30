export const NUMBER_INPUT_DOC_EN = {
  title: 'Number Input',
  description: 'A numeric input with increment/decrement buttons, min/max bounds, step, and keyboard support.',
  accessibility: [
    'Uses <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="spinbutton"</code> with aria-valuemin, aria-valuemax, aria-valuenow.',
    'Arrow Up/Down keys increment/decrement the value.',
    'Buttons have aria-label for screen readers.',
  ],
  propDescriptions: {
    value: 'The numeric value (two-way bindable).',
    min: 'Minimum allowed value.',
    max: 'Maximum allowed value.',
    step: 'Increment/decrement step.',
    disabled: 'Disable the input.',
    size: 'Size variant: sm, md, or lg.',
    placeholder: 'Placeholder text.',
  },
};
