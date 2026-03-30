export const TAG_INPUT_DOC_EN = {
  title: 'Tag Input',
  description: 'A text input that creates removable tags. Supports Enter/comma separators, validation, max tags, and reactive forms.',
  accessibility: [
    'Each remove button has an aria-label with the tag name.',
    'Input has aria-label for screen readers.',
    'Backspace on empty input removes the last tag.',
  ],
  propDescriptions: {
    value: 'Array of tag strings (two-way bindable).',
    placeholder: 'Placeholder text when no tags are present.',
    maxTags: 'Maximum number of tags allowed.',
    allowDuplicates: 'Allow duplicate tags.',
    removable: 'Show remove button on each tag.',
    addOnBlur: 'Add current input text as tag on blur.',
    separators: 'Keys that trigger tag creation (default: Enter, comma).',
    validate: 'Custom validation function. Return false to reject the tag.',
    disabled: 'Disable the input.',
    size: 'Size variant: sm, md, or lg.',
    tagAdded: 'Emitted when a tag is added.',
    tagRemoved: 'Emitted when a tag is removed.',
  },
};
