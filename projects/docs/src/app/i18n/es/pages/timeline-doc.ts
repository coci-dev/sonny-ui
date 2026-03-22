export const TIMELINE_DOC_ES = {
  title: 'Timeline',
  description: 'Muestra una secuencia cronologica de eventos en un diseno vertical.',
  subDirectivesTitle: 'Sub-directivas',
  subDirectives: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTimelineItem</code> — Entrada individual de la linea de tiempo',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTimelineStart</code> — Contenido del lado izquierdo (ej. fecha/hora)',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTimelineMiddle</code> — Conector central con icono',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTimelineEnd</code> — Contenido del lado derecho (ej. descripcion)',
  ],
  propDescriptions: {
    orientation: 'Direccion del diseno de la linea de tiempo.',
    class: 'Clases CSS adicionales a aplicar.',
  },
  itemPropDescriptions: {
    connect: 'Que lineas de conexion mostrar.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
