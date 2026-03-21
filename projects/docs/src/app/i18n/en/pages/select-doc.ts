export const SELECT_DOC_EN = {
  title: 'Select',
  description: 'Displays a list of options for the user to pick from.',
  userProfileForm: 'User Profile Form',
  accessibility: [
    'Uses a custom dropdown with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="listbox"</code> and <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="option"</code> semantics.',
    'Supports keyboard navigation with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Arrow</code> keys, <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Enter</code>, and <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Escape</code>.',
    'Disabled state is conveyed via <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-disabled</code>.',
  ],
  propDescriptions: {
    options: 'Array of { value, label } objects.',
    value: 'Selected value. Supports two-way binding.',
    placeholder: 'Placeholder text.',
    disabled: 'Whether the select is disabled.',
    size: 'The size of the select trigger.',
  },
};
