export const BUTTON_DOC_ES = {
  title: 'Botón',
  description: 'Muestra un botón o un componente con apariencia de botón.',
  examplesDesc: 'Patrones de uso del mundo real con gestión de estado.',
  asyncSubmitButton: 'Botón de Envío Asíncrono',
  accessibility: [
    'Establece <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-disabled</code> cuando está deshabilitado o cargando',
    'Establece <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tabindex="-1"</code> cuando está deshabilitado o cargando',
    'Funciona tanto con elementos <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;button&gt;</code> como <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;a&gt;</code>',
  ],
  propDescriptions: {
    variant: 'El estilo visual del botón.',
    size: 'El tamaño del botón.',
    disabled: 'Si el botón está deshabilitado.',
    loading: 'Si el botón está en estado de carga.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
