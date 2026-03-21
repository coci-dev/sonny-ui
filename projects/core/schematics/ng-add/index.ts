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

    return tree;
  };
}
