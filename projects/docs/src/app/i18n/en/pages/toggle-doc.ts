export const TOGGLE_DOC_EN = {
  title: 'Toggle',
  description: 'A two-state button that can be either on or off.',
  textFormatting: 'Text Formatting',
  accessibility: [
    'Uses <code>aria-pressed</code> to convey the toggle state to assistive technologies.',
    'Supports keyboard activation with <code>Space</code> and <code>Enter</code>.',
    'Focus is clearly visible with a ring indicator.',
  ],
  propDescriptions: {
    variant: 'The visual style of the toggle.',
    size: 'The size of the toggle.',
    pressed: 'Whether the toggle is pressed. Supports two-way binding.',
    class: 'Additional CSS classes to apply.',
  },
};
