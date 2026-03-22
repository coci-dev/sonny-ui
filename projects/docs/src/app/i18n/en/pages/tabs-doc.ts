export const TABS_DOC_EN = {
  title: 'Tabs',
  description: 'A set of layered sections of content displayed one at a time.',
  tabsLabel: 'Tabs',
  tabsTriggerLabel: 'TabsTrigger',
  tabsContentLabel: 'TabsContent',
  accessibility: [
    'Uses <code>role="tablist"</code>, <code>role="tab"</code>, and <code>role="tabpanel"</code> for proper ARIA semantics.',
    '<code>ArrowLeft</code>/<code>ArrowRight</code> navigate between tabs with roving <code>tabindex</code>. <code>Home</code>/<code>End</code> jump to first/last tab.',
    'Active tab has <code>tabindex="0"</code>, inactive tabs have <code>tabindex="-1"</code> (roving tabindex pattern).',
    'Each tab is linked to its panel via <code>aria-controls</code> and <code>aria-labelledby</code>.',
  ],
  propDescriptions: {
    tabsValue: 'The active tab value. Supports two-way binding.',
    tabsClass: 'Additional CSS classes to apply.',
    triggerValue: 'The value identifying this tab trigger.',
    triggerClass: 'Additional CSS classes to apply.',
    contentValue: 'The value identifying this tab content panel.',
    contentClass: 'Additional CSS classes to apply.',
  },
};
