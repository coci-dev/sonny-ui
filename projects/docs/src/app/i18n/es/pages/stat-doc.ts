export const STAT_DOC_ES = {
  title: 'Stat',
  description: 'Muestra una estadistica con titulo, valor y descripcion opcional.',
  subDirectivesTitle: 'Sub-directivas',
  subDirectives: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyStatTitle</code> — Etiqueta de la estadistica',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyStatValue</code> — Valor grande en negrita',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyStatDescription</code> — Descripcion opcional con soporte de variantes',
  ],
  propDescriptions: {
    class: 'Clases CSS adicionales a aplicar.',
  },
  descriptionPropDescriptions: {
    variant: 'El estilo visual del texto de descripcion.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
