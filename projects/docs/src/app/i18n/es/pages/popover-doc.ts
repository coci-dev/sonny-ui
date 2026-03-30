export const POPOVER_DOC_ES = {
  title: 'Popover',
  description: 'Un panel flotante anclado a un elemento trigger con apertura por clic, posicionamiento y manejo de clic externo/escape.',
  matchWidth: 'Coincidir Ancho del Trigger',
  matchWidthDesc: 'El panel del popover coincide con el ancho del elemento trigger.',
  programmatic: 'Control Programático',
  programmaticDesc: 'Usa una referencia de template para abrir/cerrar el popover desde cualquier elemento.',
  formContent: 'Contenido de Formulario',
  formContentDesc: 'Los popovers pueden contener cualquier contenido incluyendo inputs de formulario.',
  accessibility: [
    'El trigger tiene <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-expanded</code> y <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-haspopup="dialog"</code>.',
    'El panel de contenido tiene <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="dialog"</code>.',
    'La tecla Escape cierra el popover.',
    'Clic fuera cierra el popover.',
    'Scroll y redimensionamiento reposicionan el panel.',
  ],
  propDescriptions: {
    matchWidth: 'Coincidir el ancho del panel con el del trigger.',
    offset: 'Espacio en píxeles entre el trigger y el panel.',
    closeOnOutside: 'Cerrar al hacer clic fuera del popover.',
    closeOnEscape: 'Cerrar al presionar Escape.',
    isOpen: 'Signal que indica el estado abierto.',
  },
};
