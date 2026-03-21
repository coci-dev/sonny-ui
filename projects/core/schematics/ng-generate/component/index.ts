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
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'button-group',
  'card',
  'checkbox',
  'combobox',
  'input',
  'loader',
  'modal',
  'radio',
  'select',
  'sheet',
  'skeleton',
  'slider',
  'switch',
  'table',
  'tabs',
  'toast',
  'toggle',
];

const COMPONENT_FILES: Record<string, string[]> = {
  accordion: [
    'accordion.directives.ts',
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
  card: [
    'card.directives.ts',
    'card.variants.ts',
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
  input: [
    'input.directive.ts',
    'input.variants.ts',
    'label.directive.ts',
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
  radio: [
    'radio.directive.ts',
    'radio.variants.ts',
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
};

const COMPONENT_SPEC_FILES: Record<string, string[]> = {
  accordion: ['accordion.directives.spec.ts'],
  avatar: ['avatar.component.spec.ts'],
  badge: ['badge.directive.spec.ts'],
  breadcrumb: ['breadcrumb.directives.spec.ts'],
  button: ['button.directive.spec.ts'],
  'button-group': ['button-group.directive.spec.ts'],
  card: ['card.directives.spec.ts'],
  checkbox: ['checkbox.directive.spec.ts'],
  combobox: ['combobox.component.spec.ts'],
  input: ['input.directive.spec.ts'],
  loader: ['loader.component.spec.ts'],
  modal: ['dialog.service.spec.ts'],
  radio: ['radio.directive.spec.ts'],
  select: ['select.component.spec.ts'],
  sheet: ['sheet.component.spec.ts'],
  skeleton: ['skeleton.directive.spec.ts'],
  slider: ['slider.component.spec.ts'],
  switch: ['switch.component.spec.ts'],
  table: ['table.directives.spec.ts'],
  tabs: ['tabs.directives.spec.ts'],
  toast: ['toast.service.spec.ts'],
  toggle: ['toggle.directive.spec.ts'],
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
