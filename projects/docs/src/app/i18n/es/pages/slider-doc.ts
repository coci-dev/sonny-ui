export const SLIDER_DOC_ES = {
  title: 'Deslizador',
  description: 'Una entrada donde el usuario selecciona un valor dentro de un rango dado.',
  volumeControl: 'Control de Volumen',
  accessibility: [
    'Usa <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="slider"</code> nativo con <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-valuenow</code>, <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-valuemin</code> y <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-valuemax</code>.',
    'Soporta interacción por teclado con las teclas de <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Flecha</code> para ajustes finos.',
    'El estado deshabilitado se transmite mediante <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-disabled</code>.',
  ],
  propDescriptions: {
    value: 'Valor actual. Soporta enlace bidireccional.',
    min: 'Valor mínimo.',
    max: 'Valor máximo.',
    step: 'Incremento del paso.',
    disabled: 'Si el deslizador está deshabilitado.',
    size: 'El tamaño del deslizador.',
  },
};
