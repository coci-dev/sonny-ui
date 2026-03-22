export const DOCK_DOC_EN = {
  title: 'Dock',
  description: 'A macOS-style dock component with magnification effect on hover.',
  dock: 'Dock',
  dockItem: 'DockItem',
  propDescriptions: {
    position: 'The position of the dock on screen.',
    magnification: 'Whether the magnification effect is enabled.',
    class: 'Additional CSS classes to apply.',
  },
  accessibility: [
    'Uses <code>role="toolbar"</code> with <code>aria-label</code> for proper ARIA semantics.',
    '<code>ArrowLeft</code>/<code>ArrowRight</code> navigate between dock items with roving <code>tabindex</code>. <code>Home</code>/<code>End</code> jump to first/last item.',
    'Active item has <code>tabindex="0"</code>, inactive items have <code>tabindex="-1"</code>.',
  ],
  itemPropDescriptions: {
    label: 'The tooltip label for the dock item.',
    class: 'Additional CSS classes to apply.',
  },
};
