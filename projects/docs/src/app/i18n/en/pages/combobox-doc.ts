export const COMBOBOX_DOC_EN = {
  title: 'Combobox',
  description: 'A select-like component with a searchable dropdown list.',
  countrySelector: 'Country Selector',
  accessibility: [
    'Trigger button uses <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="combobox"</code> with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-expanded</code>',
    'Dropdown uses <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="listbox"</code> with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="option"</code>',
    'Selected option indicated with a checkmark icon',
    'Keyboard navigation: Arrow keys, Enter to select, Escape to close',
  ],
  propDescriptions: {
    options: 'Array of { value, label } objects.',
    value: 'Two-way bound selected value.',
    placeholder: 'Placeholder text for the trigger button.',
    searchPlaceholder: 'Placeholder text for the search input inside the dropdown.',
    size: 'The size of the trigger button.',
    class: 'Additional CSS classes to apply to the trigger.',
  },
};
