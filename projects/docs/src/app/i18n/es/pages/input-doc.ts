export const INPUT_DOC_ES = {
  title: 'Input',
  description: 'Muestra un campo de entrada de formulario.',
  withLabel: 'Con Etiqueta',
  disabled: 'Deshabilitado',
  examplesDesc: 'Patrones de uso del mundo real con gestión de estado.',
  formWithReactiveValidation: 'Formulario con Validación Reactiva',
  snyInputDirective: 'SnyInputDirective',
  snyLabelDirective: 'SnyLabelDirective',
  accessibility: [
    'Establece <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-invalid</code> cuando la variante es "error"',
    'Soporta <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-describedby</code> para mensajes de error',
    'Funciona con <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;input&gt;</code> y <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;textarea&gt;</code>',
  ],
  propDescriptions: {
    variant: 'El estado visual del campo de entrada.',
    inputSize: 'El tamaño del campo de entrada.',
    ariaDescribedBy: 'ID del elemento que describe el campo de entrada.',
    class: 'Clases CSS adicionales a aplicar.',
  },
  labelPropDescriptions: {
    variant: 'Coincide con la variante del campo de entrada para un estilo consistente.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
