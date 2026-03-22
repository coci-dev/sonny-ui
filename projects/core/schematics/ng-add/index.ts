import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function ngAdd(options: { project?: string; theme?: string }): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Adding SonnyUI to your project...');

    // Create .postcssrc.json if it doesn't exist
    if (!tree.exists('.postcssrc.json')) {
      tree.create(
        '.postcssrc.json',
        JSON.stringify({ plugins: { '@tailwindcss/postcss': {} } }, null, 2)
      );
      context.logger.info('Created .postcssrc.json');
    }

    // Add theme import to styles.css
    const stylesPath = 'src/styles.css';
    if (tree.exists(stylesPath)) {
      const content = tree.read(stylesPath)!.toString('utf-8');
      const themeImport = '@import "@sonny-ui/core/styles/sonny-theme.css";';
      const sourceDirective = '@source "../node_modules/@sonny-ui/core";';

      if (!content.includes(themeImport)) {
        const newContent = `${themeImport}\n${sourceDirective}\n\n${content}`;
        tree.overwrite(stylesPath, newContent);
        context.logger.info('Added SonnyUI theme import to styles.css');
      }
    }

    // Add provideSonnyUI to app.config.ts
    const configPath = 'src/app/app.config.ts';
    if (tree.exists(configPath)) {
      let configContent = tree.read(configPath)!.toString('utf-8');
      const theme = options.theme || 'light';

      if (!configContent.includes('provideSonnyUI')) {
        // Add import statement
        const importLine = `import { provideSonnyUI } from '@sonny-ui/core';\n`;
        const lastImportIndex = configContent.lastIndexOf('import ');
        const lastImportEnd = configContent.indexOf('\n', lastImportIndex);
        configContent =
          configContent.slice(0, lastImportEnd + 1) +
          importLine +
          configContent.slice(lastImportEnd + 1);

        // Add provider to providers array
        const providersMatch = configContent.match(/providers\s*:\s*\[/);
        if (providersMatch && providersMatch.index !== undefined) {
          const insertPos = providersMatch.index + providersMatch[0].length;
          configContent =
            configContent.slice(0, insertPos) +
            `\n    provideSonnyUI({ defaultTheme: '${theme}' }),` +
            configContent.slice(insertPos);
        }

        tree.overwrite(configPath, configContent);
        context.logger.info('Added provideSonnyUI to app.config.ts');
      }
    }

    return tree;
  };
}
