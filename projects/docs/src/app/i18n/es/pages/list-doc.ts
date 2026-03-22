export const LIST_DOC_ES = {
  title: 'List',
  description: 'Muestra una lista estructurada de elementos con iconos y acciones opcionales.',
  subDirectivesTitle: 'Sub-directivas',
  subDirectives: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyListItem</code> — Entrada individual de la lista',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyListItemContent</code> — Area de contenido principal del elemento',
  ],
  propDescriptions: {
    variant: 'El estilo visual de la lista.',
    class: 'Clases CSS adicionales a aplicar.',
  },
  itemPropDescriptions: {
    active: 'Si el elemento esta en estado activo.',
    disabled: 'Si el elemento esta deshabilitado.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
