export const COMBOBOX_DOC_ES = {
  title: 'Combobox',
  description: 'Un componente tipo selector con una lista desplegable con búsqueda.',
  countrySelector: 'Selector de País',
  accessibility: [
    'El botón de activación usa <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="combobox"</code> con <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-expanded</code>',
    'El desplegable usa <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="listbox"</code> con <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="option"</code>',
    'La opción seleccionada se indica con un icono de marca de verificación',
    'Navegación por teclado: teclas de flecha, Enter para seleccionar, Escape para cerrar',
  ],
  propDescriptions: {
    options: 'Array de objetos { value, label }.',
    value: 'Valor seleccionado con enlace bidireccional.',
    placeholder: 'Texto de marcador de posición para el botón de activación.',
    searchPlaceholder: 'Texto de marcador de posición para la entrada de búsqueda dentro del desplegable.',
    size: 'El tamaño del botón de activación.',
    class: 'Clases CSS adicionales para aplicar al activador.',
  },
};
