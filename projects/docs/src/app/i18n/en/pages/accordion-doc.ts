export const ACCORDION_DOC_EN = {
  title: 'Accordion',
  description: 'A vertically stacked set of interactive headings that each reveal content.',
  faqWithMultiMode: 'FAQ with Multi Mode',
  accordion: 'Accordion',
  accordionItem: 'AccordionItem',
  propDescriptions: {
    multi: 'Allow multiple items to be open at once.',
    class: 'Additional CSS classes to apply.',
  },
  accessibility: [
    'Triggers use <code>aria-expanded</code> to indicate open/closed state.',
    '<code>ArrowUp</code>/<code>ArrowDown</code> navigate between accordion triggers. <code>Home</code>/<code>End</code> jump to first/last trigger.',
    'Content regions use <code>role="region"</code> for proper ARIA semantics.',
  ],
  itemPropDescriptions: {
    value: 'Unique identifier for the accordion item.',
    class: 'Additional CSS classes to apply.',
  },
};
