import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as path from 'path';

interface Schema {
  name: string;
  path: string;
  prefix: string;
  skipTests: boolean;
}

const AVAILABLE_COMPONENTS = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'button-group',
  'calendar',
  'card',
  'carousel',
  'chat-bubble',
  'checkbox',
  'combobox',
  'diff',
  'divider',
  'dock',
  'drawer',
  'dropdown',
  'fab',
  'fieldset',
  'file-input',
  'indicator',
  'input',
  'kbd',
  'link',
  'list',
  'loader',
  'modal',
  'navbar',
  'pagination',
  'progress',
  'radial-progress',
  'radio',
  'rating',
  'select',
  'sheet',
  'skeleton',
  'slider',
  'stat',
  'status',
  'steps',
  'switch',
  'table',
  'tabs',
  'textarea',
  'timeline',
  'toast',
  'toggle',
  'tooltip',
  'validator',
];

const COMPONENT_FILES: Record<string, string[]> = {
  accordion: [
    'accordion.directives.ts',
    'index.ts',
  ],
  alert: [
    'alert.directives.ts',
    'alert.variants.ts',
    'index.ts',
  ],
  avatar: [
    'avatar.component.ts',
    'avatar.variants.ts',
    'index.ts',
  ],
  badge: [
    'badge.directive.ts',
    'badge.variants.ts',
    'index.ts',
  ],
  breadcrumb: [
    'breadcrumb.directives.ts',
    'index.ts',
  ],
  button: [
    'button.directive.ts',
    'button.variants.ts',
    'index.ts',
  ],
  'button-group': [
    'button-group.directive.ts',
    'button-group.variants.ts',
    'index.ts',
  ],
  calendar: [
    'calendar.component.ts',
    'index.ts',
  ],
  card: [
    'card.directives.ts',
    'card.variants.ts',
    'index.ts',
  ],
  carousel: [
    'carousel.directives.ts',
    'index.ts',
  ],
  'chat-bubble': [
    'chat-bubble.directives.ts',
    'index.ts',
  ],
  checkbox: [
    'checkbox.directive.ts',
    'checkbox.variants.ts',
    'index.ts',
  ],
  combobox: [
    'combobox.component.ts',
    'combobox.variants.ts',
    'index.ts',
  ],
  diff: [
    'diff.component.ts',
    'index.ts',
  ],
  divider: [
    'divider.component.ts',
    'divider.variants.ts',
    'index.ts',
  ],
  dock: [
    'dock.directives.ts',
    'index.ts',
  ],
  drawer: [
    'drawer.directives.ts',
    'index.ts',
  ],
  dropdown: [
    'dropdown.directives.ts',
    'dropdown.variants.ts',
    'index.ts',
  ],
  fab: [
    'fab.directives.ts',
    'index.ts',
  ],
  fieldset: [
    'fieldset.directives.ts',
    'fieldset.variants.ts',
    'index.ts',
  ],
  'file-input': [
    'file-input.component.ts',
    'file-input.variants.ts',
    'index.ts',
  ],
  indicator: [
    'indicator.directives.ts',
    'index.ts',
  ],
  input: [
    'input.directive.ts',
    'input.variants.ts',
    'label.directive.ts',
    'index.ts',
  ],
  kbd: [
    'kbd.directive.ts',
    'kbd.variants.ts',
    'index.ts',
  ],
  link: [
    'link.directive.ts',
    'link.variants.ts',
    'index.ts',
  ],
  list: [
    'list.directives.ts',
    'index.ts',
  ],
  loader: [
    'loader.component.ts',
    'loader.variants.ts',
    'index.ts',
  ],
  modal: [
    'dialog.types.ts',
    'dialog-ref.ts',
    'dialog.service.ts',
    'dialog.directives.ts',
    'index.ts',
  ],
  navbar: [
    'navbar.directives.ts',
    'index.ts',
  ],
  pagination: [
    'pagination.component.ts',
    'pagination.variants.ts',
    'index.ts',
  ],
  progress: [
    'progress.component.ts',
    'progress.variants.ts',
    'index.ts',
  ],
  'radial-progress': [
    'radial-progress.component.ts',
    'index.ts',
  ],
  radio: [
    'radio.directive.ts',
    'radio.variants.ts',
    'index.ts',
  ],
  rating: [
    'rating.component.ts',
    'rating.variants.ts',
    'index.ts',
  ],
  select: [
    'select.component.ts',
    'select.variants.ts',
    'index.ts',
  ],
  sheet: [
    'sheet-ref.ts',
    'sheet.directives.ts',
    'sheet.service.ts',
    'sheet.types.ts',
    'index.ts',
  ],
  skeleton: [
    'skeleton.directive.ts',
    'skeleton.variants.ts',
    'index.ts',
  ],
  slider: [
    'slider.component.ts',
    'slider.variants.ts',
    'index.ts',
  ],
  stat: [
    'stat.directives.ts',
    'index.ts',
  ],
  status: [
    'status.directive.ts',
    'status.variants.ts',
    'index.ts',
  ],
  steps: [
    'steps.directives.ts',
    'index.ts',
  ],
  switch: [
    'switch.component.ts',
    'switch.variants.ts',
    'index.ts',
  ],
  table: [
    'table.directives.ts',
    'table.variants.ts',
    'index.ts',
  ],
  tabs: [
    'tabs.directives.ts',
    'tabs.variants.ts',
    'index.ts',
  ],
  textarea: [
    'textarea.directive.ts',
    'textarea.variants.ts',
    'index.ts',
  ],
  timeline: [
    'timeline.directives.ts',
    'index.ts',
  ],
  toast: [
    'toast.service.ts',
    'toast.variants.ts',
    'toaster.component.ts',
    'index.ts',
  ],
  toggle: [
    'toggle.directive.ts',
    'toggle.variants.ts',
    'index.ts',
  ],
  tooltip: [
    'tooltip.directive.ts',
    'tooltip.variants.ts',
    'index.ts',
  ],
  validator: [
    'validator.directives.ts',
    'index.ts',
  ],
};

const COMPONENT_SPEC_FILES: Record<string, string[]> = {
  accordion: ['accordion.directives.spec.ts'],
  alert: ['alert.directives.spec.ts'],
  avatar: ['avatar.component.spec.ts'],
  badge: ['badge.directive.spec.ts'],
  breadcrumb: ['breadcrumb.directives.spec.ts'],
  button: ['button.directive.spec.ts'],
  'button-group': ['button-group.directive.spec.ts'],
  calendar: ['calendar.component.spec.ts'],
  card: ['card.directives.spec.ts'],
  carousel: ['carousel.directives.spec.ts'],
  'chat-bubble': ['chat-bubble.directives.spec.ts'],
  checkbox: ['checkbox.directive.spec.ts'],
  combobox: ['combobox.component.spec.ts'],
  diff: ['diff.component.spec.ts'],
  divider: ['divider.component.spec.ts'],
  dock: ['dock.directives.spec.ts'],
  drawer: ['drawer.directives.spec.ts'],
  dropdown: ['dropdown.directives.spec.ts'],
  fab: ['fab.directives.spec.ts'],
  fieldset: ['fieldset.directives.spec.ts'],
  'file-input': ['file-input.component.spec.ts'],
  indicator: ['indicator.directives.spec.ts'],
  input: ['input.directive.spec.ts'],
  kbd: ['kbd.directive.spec.ts'],
  link: ['link.directive.spec.ts'],
  list: ['list.directives.spec.ts'],
  loader: ['loader.component.spec.ts'],
  modal: ['dialog.service.spec.ts'],
  navbar: ['navbar.directives.spec.ts'],
  pagination: ['pagination.component.spec.ts'],
  progress: ['progress.component.spec.ts'],
  'radial-progress': ['radial-progress.component.spec.ts'],
  radio: ['radio.directive.spec.ts'],
  rating: ['rating.component.spec.ts'],
  select: ['select.component.spec.ts'],
  sheet: ['sheet.component.spec.ts'],
  skeleton: ['skeleton.directive.spec.ts'],
  slider: ['slider.component.spec.ts'],
  stat: ['stat.directives.spec.ts'],
  status: ['status.directive.spec.ts'],
  steps: ['steps.directives.spec.ts'],
  switch: ['switch.component.spec.ts'],
  table: ['table.directives.spec.ts'],
  tabs: ['tabs.directives.spec.ts'],
  textarea: ['textarea.directive.spec.ts'],
  timeline: ['timeline.directives.spec.ts'],
  toast: ['toast.service.spec.ts'],
  toggle: ['toggle.directive.spec.ts'],
  tooltip: ['tooltip.directive.spec.ts'],
  validator: ['validator.directives.spec.ts'],
};

export function generateComponent(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const name = options.name.toLowerCase();

    if (!AVAILABLE_COMPONENTS.includes(name)) {
      throw new Error(
        `Unknown component "${name}". Available: ${AVAILABLE_COMPONENTS.join(', ')}`
      );
    }

    const targetDir = options.path || 'src/app/ui';
    const componentDir = `${targetDir}/${name}`;
    const files = COMPONENT_FILES[name];
    const specFiles = options.skipTests ? [] : (COMPONENT_SPEC_FILES[name] || []);

    // Ensure cn.ts utility exists
    const cnTargetPath = `${targetDir}/utils/cn.ts`;
    if (!tree.exists(cnTargetPath)) {
      const cnContent = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`;
      tree.create(cnTargetPath, cnContent);
      context.logger.info('Created utils/cn.ts');
    }

    // Copy component files from the library source
    const sourceBase = path.join(__dirname, '..', '..', '..', 'src', 'lib', name);

    for (const file of [...files, ...specFiles]) {
      const sourcePath = path.join(sourceBase, file);
      const destPath = `${componentDir}/${file}`;

      if (tree.exists(destPath)) {
        context.logger.warn(`File already exists: ${destPath} — skipping`);
        continue;
      }

      // Read from the package's source files
      try {
        const fs = require('fs');
        let content = fs.readFileSync(sourcePath, 'utf-8');

        // Rewrite imports to use local cn utility
        content = content.replace(
          /from ['"]\.\.\/core\/utils\/cn['"]/g,
          `from '../utils/cn'`
        );

        // Rewrite prefix if custom
        if (options.prefix && options.prefix !== 'sny') {
          content = content.replace(/sny/g, options.prefix);
          content = content.replace(/Sny/g, capitalize(options.prefix));
        }

        tree.create(destPath, content);
        context.logger.info(`Created ${destPath}`);
      } catch (e) {
        context.logger.error(`Could not read source file: ${sourcePath}`);
      }
    }

    context.logger.info(`Component "${name}" copied to ${componentDir}`);
    return tree;
  };
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
