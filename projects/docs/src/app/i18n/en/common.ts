import type { CommonTranslations } from '../i18n.types';

export const COMMON_EN: CommonTranslations = {
  nav: {
    docs: 'Docs',
    components: 'Components',
    github: 'GitHub',
    searchPlaceholder: 'Search docs...',
    alpha: 'alpha',
    toggleSidebar: 'Toggle sidebar',
  },
  search: {
    placeholder: 'Search docs...',
    noResults: 'No results found.',
    navigate: 'Navigate',
    open: 'Open',
    close: 'Close',
  },
  sidebar: [
    {
      title: 'Getting Started',
      items: [
        { label: 'Installation', path: '/docs/getting-started/installation' },
        { label: 'Quick Start', path: '/docs/getting-started/quick-start' },
      ],
    },
    {
      title: 'Theming',
      items: [
        { label: 'Overview', path: '/docs/theming/overview' },
        { label: 'Dark Mode', path: '/docs/theming/dark-mode' },
        { label: 'Custom Themes', path: '/docs/theming/custom-themes' },
      ],
    },
    {
      title: 'Components',
      items: [
        { label: 'Accordion', path: '/docs/components/accordion' },
        { label: 'Avatar', path: '/docs/components/avatar' },
        { label: 'Badge', path: '/docs/components/badge' },
        { label: 'Breadcrumb', path: '/docs/components/breadcrumb' },
        { label: 'Button', path: '/docs/components/button' },
        { label: 'Button Group', path: '/docs/components/button-group' },
        { label: 'Card', path: '/docs/components/card' },
        { label: 'Checkbox', path: '/docs/components/checkbox' },
        { label: 'Combobox', path: '/docs/components/combobox' },
        { label: 'Input', path: '/docs/components/input' },
        { label: 'Loader', path: '/docs/components/loader' },
        { label: 'Modal', path: '/docs/components/modal' },
        { label: 'Radio', path: '/docs/components/radio' },
        { label: 'Select', path: '/docs/components/select' },
        { label: 'Sheet', path: '/docs/components/sheet' },
        { label: 'Skeleton', path: '/docs/components/skeleton' },
        { label: 'Slider', path: '/docs/components/slider' },
        { label: 'Switch', path: '/docs/components/switch' },
        { label: 'Table', path: '/docs/components/table' },
        { label: 'Tabs', path: '/docs/components/tabs' },
        { label: 'Toast', path: '/docs/components/toast' },
        { label: 'Toggle', path: '/docs/components/toggle' },
      ],
    },
    {
      title: 'Schematics',
      items: [
        { label: 'ng add', path: '/docs/schematics/ng-add' },
        { label: 'Copy & Paste', path: '/docs/schematics/copy-paste' },
      ],
    },
    {
      title: 'Contributing',
      items: [{ label: 'Development', path: '/docs/contributing/development' }],
    },
  ],
  shared: {
    preview: 'Preview',
    code: 'Code',
    copy: 'Copy',
    copied: 'Copied!',
  },
  docSections: {
    import: 'Import',
    usage: 'Usage',
    variants: 'Variants',
    sizes: 'Sizes',
    states: 'States',
    examples: 'Examples',
    apiReference: 'API Reference',
    accessibility: 'Accessibility',
    asLink: 'As Link',
  },
  propsTable: {
    prop: 'Prop',
    type: 'Type',
    default: 'Default',
    description: 'Description',
  },
};
