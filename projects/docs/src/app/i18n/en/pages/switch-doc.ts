export const SWITCH_DOC_EN = {
  title: 'Switch',
  description: 'A toggle switch for turning settings on or off.',
  settingsPanel: 'Settings Panel',
  accessibility: [
    'Uses <code>role="switch"</code> with <code>aria-checked</code> for screen readers.',
    'Supports keyboard activation with <code>Space</code> and <code>Enter</code>.',
    'Disabled state is conveyed via <code>aria-disabled</code>.',
  ],
  propDescriptions: {
    checked: 'Whether the switch is on. Supports two-way binding.',
    disabled: 'Whether the switch is disabled.',
    size: 'The size of the switch.',
    class: 'Additional CSS classes to apply.',
  },
};
